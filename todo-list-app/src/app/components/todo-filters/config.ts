import { IFilterConfig, TFilterOption } from '../../shared/types/filters.interface';
import { TASK_LABELS, TASK_PRIORITY, TODO_STATUS } from '../../shared/util/constants';

export const getStaticOptions = (options: Record<string, string | null>): TFilterOption[] => {
  return [
    { label: 'filters.all', value: 'ALL' },
    ...Object.entries(options).map(([key, val]) => ({
      label: `filters.${key.toLowerCase()}`,
      value: val,
    })),
  ];
};

export const STATIC_CONFIGS: IFilterConfig[] = [
  {
    key: 'status',
    label: 'todo.status',
    options: getStaticOptions(TODO_STATUS),
  },
  {
    key: 'labels',
    label: 'common.labels',
    options: getStaticOptions(TASK_LABELS),
  },
  {
    key: 'priority',
    label: 'todo.priority',
    options: getStaticOptions(TASK_PRIORITY),
  },
];
