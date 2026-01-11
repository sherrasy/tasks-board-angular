import { TTodoFilter } from '../../shared/types/filters.interface';

export const UNASSIGNED_VALUE = 'NONE';

export const DEFAULT_TODO_FILTER: TTodoFilter = {
  status: 'ALL',
  assignee: 'ALL',
  reporter: 'ALL',
  labels: 'ALL',
  sprint: 'ALL',
  priority: 'ALL',
} as const;
