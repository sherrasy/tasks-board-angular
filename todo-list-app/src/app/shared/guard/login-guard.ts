import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthStore } from '../../store/auth-store';
import { APP_ROUTES } from '../util/constants';

export const loginGuard: CanActivateFn = () => {
  const store = inject(AuthStore);
  const router = inject(Router);

  if (store.isAuthenticated()) {
    return router.createUrlTree([`/${APP_ROUTES.TASKS}`]);
  }
  return true;
};
