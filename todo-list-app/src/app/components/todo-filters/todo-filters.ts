import { Component, computed, inject } from '@angular/core';
import { TodoFilter } from './todo-filter/todo-filter';
import { TTodoFilter, TFilterOption, IFilterConfig } from '../../shared/types/filters.interface';
import { STATIC_CONFIGS } from './config';
import { TodosStore } from '../../store/todos-store';
import { AuthStore } from '../../store/auth-store';
import { DEFAULT_TODO_FILTER, UNASSIGNED_VALUE } from './consts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-filters',
  imports: [TodoFilter, MatButtonModule, MatIconModule],
  templateUrl: './todo-filters.html',
  styleUrl: './todo-filters.scss',
})
export class TodoFilters {
  protected readonly todosStore = inject(TodosStore);
  protected readonly authStore = inject(AuthStore);

  protected readonly filterConfigs = computed<IFilterConfig[]>(() => {
    const allUsers = this.authStore.users().map((u) => ({ label: u.name, value: u.id }));
    const assigneeOptions: TFilterOption[] = [
      { label: 'ALL', value: 'ALL' },
      { label: UNASSIGNED_VALUE, value: UNASSIGNED_VALUE },
      ...allUsers,
    ];

    const reporterOptions: TFilterOption[] = [{ label: 'ALL', value: 'ALL' }, ...allUsers];

    const uniqueSprints = [
      ...new Set(
        this.todosStore
          .todos()
          .map((t) => t.sprint)
          .filter((s): s is string => !!s)
      ),
    ].sort();

    const sprintOptions: TFilterOption[] = [
      { label: 'ALL', value: 'ALL' },
      { label: UNASSIGNED_VALUE, value: UNASSIGNED_VALUE },
      ...uniqueSprints.map((s) => ({ label: s, value: s })),
    ];

    return [
      ...STATIC_CONFIGS,
      { key: 'assignee', label: 'todo.assignee', options: assigneeOptions },
      { key: 'reporter', label: 'todo.reporter', options: reporterOptions },
      { key: 'sprint', label: 'todo.sprint', options: sprintOptions },
    ];
  });

  protected hasActiveFilters = computed(() => {
    const current = this.todosStore.filters();
    const defaults = DEFAULT_TODO_FILTER;
    return (Object.keys(current) as Array<keyof TTodoFilter>).some(
      (key) => current[key] !== defaults[key]
    );
  });

  protected onUpdateFilter(key: keyof TTodoFilter, value: any): void {
    this.todosStore.patchFilters({ [key]: value });
  }

  protected clearAll(): void {
    this.todosStore.resetFilters();
  }
}
