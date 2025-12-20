import { Component } from '@angular/core';
import { TASK_LABELS, TASK_PRIORITY, TODO_STATUS } from '../../shared/util/constants';
import { TodoFilter } from './todo-filter/todo-filter';
import { ASSIGNEE_OPTIONS, REPORTER_OPTIONS, SPRINT_OPTIONS } from './consts';
import { TFilterOption } from '../../shared/types/filters.interface';

@Component({
  selector: 'app-todo-filters',
  imports: [TodoFilter],
  templateUrl: './todo-filters.html',
  styleUrl: './todo-filters.scss',
})
export class TodoFilters {
  private getOptions(options: Record<string, string | null>): TFilterOption[] {
    const opts: TFilterOption[] = [
      { label: 'ALL', value: null },
      ...Object.entries(options).map(([key, val]) => ({ label: key, value: val })),
    ];

    return opts;
  }

  protected readonly statusOptions: TFilterOption[] = this.getOptions(TODO_STATUS);
  protected readonly priorityOptions: TFilterOption[] = this.getOptions(TASK_PRIORITY);
  protected readonly labelsOptions: TFilterOption[] = this.getOptions(TASK_LABELS);
  protected readonly assigneeOptions: TFilterOption[] = this.getOptions(ASSIGNEE_OPTIONS);
  protected readonly reporterOptions: TFilterOption[] = this.getOptions(REPORTER_OPTIONS);
  protected readonly sprintOptions: TFilterOption[] = this.getOptions(SPRINT_OPTIONS);
}
