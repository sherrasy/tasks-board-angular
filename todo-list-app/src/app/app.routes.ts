import { Routes } from '@angular/router';
import { TodoResolver } from './shared/resolver/todos-resolver';
import { APP_ROUTES, ROUTE_TITLES } from './shared/util/constants';
import { authGuard } from './shared/guard/auth-guard';
import { loginGuard } from './shared/guard/login-guard';

export const routes: Routes = [
  {
    path: APP_ROUTES.LOGIN,
    loadComponent: () => import('./components/login/login').then((c) => c.Login),
    title: ROUTE_TITLES.LOGIN,
    canActivate: [loginGuard],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: APP_ROUTES.MAIN,
        redirectTo: APP_ROUTES.TASKS,
        pathMatch: 'full',
        title: ROUTE_TITLES.MAIN,
      },
      {
        path: APP_ROUTES.TASKS,
        loadComponent: () => import('./components/todo-list/todo-list').then((c) => c.TodoList),
        title: ROUTE_TITLES.BACKLOG,
        children: [
          {
            path: APP_ROUTES.TASK_DETAILS,
            loadComponent: () =>
              import('./components/todo-list/todo-details/todo-details').then((c) => c.TodoDetails),
            resolve: {
              todo: TodoResolver,
            },
          },
        ],
      },
      {
        path: APP_ROUTES.BOARD,
        loadComponent: () => import('./components/todo-board/todo-board').then((c) => c.TodoBoard),
        title: ROUTE_TITLES.BOARD,
        children: [
          {
            path: APP_ROUTES.TASK_DETAILS,
            loadComponent: () =>
              import('./components/todo-list/todo-details/todo-details').then((c) => c.TodoDetails),
            resolve: {
              todo: TodoResolver,
            },
          },
        ],
      },
      {
        path: APP_ROUTES.USER_STATS,
        loadComponent: () => import('./components/user-stats/user-stats').then((m) => m.UserStats),
        title: ROUTE_TITLES.USER_STATS,
      },
      {
        path: APP_ROUTES.ERROR,
        redirectTo: APP_ROUTES.TASKS,
        title: ROUTE_TITLES.ERROR,
      },
    ],
  },
  {
    path: APP_ROUTES.ERROR,
    redirectTo: APP_ROUTES.LOGIN,
    title: ROUTE_TITLES.ERROR,
  },
];
