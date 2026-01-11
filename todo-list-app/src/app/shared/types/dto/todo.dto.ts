import { TTaskLabel, TTaskPriority, TTodoStatus } from '../todo-item.interface';

export interface AddTodoDto {
  name: string;
  description: string;
  status: TTodoStatus;
  estimate: number;
  assignee: string | null;
  reporter: string;
  labels: TTaskLabel[];
  sprint: string | null;
  priority: TTaskPriority;
  completedSprint: string | null;
}

export interface EditTodoDto extends AddTodoDto {
  id: string;
}
