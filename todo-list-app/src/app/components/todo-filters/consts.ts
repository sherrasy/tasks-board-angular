import { TTodoFilter } from '../../shared/types/filters.interface';

// TODO: убрать после добавления функционала
export const ASSIGNEE_OPTIONS = {
  NONE: null,
  USER1: 'user1',
  USER2: 'user2',
};

export const REPORTER_OPTIONS = {
  USER1: 'user1',
  USER2: 'user2',
  USER3: 'user3',
};

export const SPRINT_OPTIONS = {
  NONE: null,
  SPRINT_1: '1',
  SPRINT_2: '2',
};

export const DEFAULT_TODO_FILTER: TTodoFilter = {
  status: 'ALL',
  assignee: 'ALL',
  reporter: 'ALL',
  labels: 'ALL',
  sprint: 'ALL',
  priority: 'ALL',
} as const;
