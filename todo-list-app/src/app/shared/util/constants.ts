export const TOOLTIP_TEXT = {
  LIST_ITEM: 'tooltips.showDescription',
  ADD_BUTTON: 'tooltips.saveTodo',
  DELETE_BUTTON: 'tooltips.removeTodo',
  SAVE_TITLE: 'tooltips.saveTitle',
} as const;

export const TOAST_TEXT = {
  ADD_TODO: 'toasts.addTodoSuccess',
  DELETE_TODO: 'toasts.deleteTodoSuccess',
  UPDATE_TODO: 'toasts.updateTodoSuccess',
  ERROR_TODO: 'toasts.failedToManageTodo',
  ERROR_TODOS: 'toasts.failedToFetchTodos',
  REGISTER_SUCCESS: 'toasts.userCreated',
  ERROR_USER_LOAD: 'toasts.failedToLoadUsers',
  ERROR_CREATE: 'toasts.failedToCreateUser',
} as const;

export const TOAST_VARIANT = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const TOAST_ICONS = {
  [TOAST_VARIANT.SUCCESS]: 'check_circle',
  [TOAST_VARIANT.ERROR]: 'error',
} as const;

export const DEFAULT_FILTER_STATUS = 'ALL';

export const TODO_STATUS = {
  NEW: 'New',
  INPROGRESS: 'InProgress',
  COMPLETED: 'Completed',
} as const;

export const TASK_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
} as const;

export const TASK_LABELS = {
  BUG: 'bug',
  FEATURE: 'feature',
  REFACTOR: 'refactor',
} as const;

export const APP_ROUTES = {
  MAIN: '',
  TASKS: 'tasks',
  BOARD: 'board',
  TASK_DETAILS: ':id',
  LOGIN: 'login',
  USERS_STAT: 'user-stats',
  ERROR: '**',
} as const;

export const ROUTE_TITLES = {
  MAIN: 'Main',
  BACKLOG: 'Backlog',
  BOARD: 'Board',
  LOGIN: 'Login',
  ERROR: 'Error',
} as const;
