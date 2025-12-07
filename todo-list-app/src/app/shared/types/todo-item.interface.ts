import { TODO_STATUS, TASK_PRIORITY, TASK_LABELS } from '../util/constants';

export type TTodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];
export type TTaskPriority = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];
export type TTaskLabel = (typeof TASK_LABELS)[keyof typeof TASK_LABELS];
export interface ITodoItem {
  id: string;
  name: string;
  description: string;
  status: TTodoStatus;
  estimate: number;
  assignee: string | null;
  reporter: string;
  labels: TTaskLabel[];
  sprint: number | null;
  priority: TTaskPriority;
  completedSprint: number | null;
}
