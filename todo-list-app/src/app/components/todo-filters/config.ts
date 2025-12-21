import { TASK_LABELS, TASK_PRIORITY, TODO_STATUS } from '../../shared/util/constants';
import { ASSIGNEE_OPTIONS, REPORTER_OPTIONS, SPRINT_OPTIONS } from './consts';
import { TFilterOption, TTodoFilter } from '../../shared/types/filters.interface';

const getOptions = (options: Record<string, string | null>): TFilterOption[] => {
  return [
    { label: 'ALL', value: 'ALL' },
    ...Object.entries(options).map(([key, val]) => ({ label: key, value: val })),
  ];
};

export const filterConfigs: {
  key: keyof TTodoFilter;
  label: string;
  options: TFilterOption[];
}[] = [
  { key: 'status', label: 'todo.status', options: getOptions(TODO_STATUS) },
  { key: 'assignee', label: 'todo.assignee', options: getOptions(ASSIGNEE_OPTIONS) },
  { key: 'reporter', label: 'todo.reporter', options: getOptions(REPORTER_OPTIONS) },
  { key: 'labels', label: 'common.labels', options: getOptions(TASK_LABELS) },
  { key: 'sprint', label: 'todo.sprint', options: getOptions(SPRINT_OPTIONS) },
  { key: 'priority', label: 'todo.priority', options: getOptions(TASK_PRIORITY) },
];
