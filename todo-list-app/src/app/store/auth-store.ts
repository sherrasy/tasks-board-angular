import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap, from } from 'rxjs';
import * as bcrypt from 'bcryptjs';

import { UsersApiService } from '../services/users-api/users-api';
import { IUser } from '../shared/types/user.interface';
import { APP_ROUTES } from '../shared/util/constants';

interface AuthState {
  users: IUser[];
  currentUser: Omit<IUser, 'password'> | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  users: [],
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  isLoading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ currentUser }) => ({
    isAuthenticated: computed(() => !!currentUser()),
    currentUserId: computed(() => currentUser()?.id ?? null),
  })),
  withMethods((store, usersApi = inject(UsersApiService), router = inject(Router)) => {
    return {
      loadUsers: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            usersApi.getAllUsers().pipe(
              tap((users) => patchState(store, { users, isLoading: false })),
              catchError(() => {
                patchState(store, { isLoading: false });
                return of([]);
              })
            )
          )
        )
      ),

      login: rxMethod<{ userId: string; pass: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(({ userId, pass }) => {
            const user = store.users().find((u) => u.id === userId);

            if (!user) {
              patchState(store, { isLoading: false });
              return of(null);
            }

            return from(bcrypt.compare(pass.trim(), user.password.trim())).pipe(
              tap((isMatch) => {
                if (isMatch) {
                  const { password, ...userWithoutPass } = user;
                  patchState(store, { currentUser: userWithoutPass, isLoading: false });
                  localStorage.setItem('currentUser', JSON.stringify(userWithoutPass));
                  router.navigate([APP_ROUTES.TASKS]);
                } else {
                  patchState(store, { isLoading: false });
                }
              }),
              catchError((err) => {
                console.error('Bcrypt error:', err);
                patchState(store, { isLoading: false });
                return of(null);
              })
            );
          })
        )
      ),

      register: rxMethod<{ name: string; pass: string }>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(({ name, pass }) =>
            from(bcrypt.hash(pass, 10)).pipe(
              switchMap((hashedPassword) =>
                usersApi.createUser({ id: crypto.randomUUID(), name, password: hashedPassword })
              ),
              tap((savedUser) => {
                if (savedUser) {
                  patchState(store, (state) => ({
                    users: [...state.users, savedUser],
                    isLoading: false,
                  }));
                } else {
                  patchState(store, { isLoading: false });
                }
              })
            )
          )
        )
      ),

      logout: () => {
        patchState(store, { currentUser: null });
        localStorage.removeItem('currentUser');
        router.navigate([APP_ROUTES.LOGIN]);
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.loadUsers();
    },
  })
);
