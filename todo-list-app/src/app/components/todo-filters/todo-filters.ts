import { Component, computed, inject } from '@angular/core';
import { TodoFilter } from './todo-filter/todo-filter';
import { TTodoFilter } from '../../shared/types/filters.interface';
import { filterConfigs } from './config';
import { TodosStore } from '../../store/todos-store';
import { DEFAULT_TODO_FILTER } from './consts';
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
  protected readonly todoFilters = filterConfigs;

  protected hasActiveFilters = computed(() => {
    const current = this.todosStore.filters();
    return Object.keys(current).some(
      (key) => current[key as keyof TTodoFilter] !== DEFAULT_TODO_FILTER[key as keyof TTodoFilter]
    );
  });

  protected onUpdateFilter(key: keyof TTodoFilter, value: string | null): void {
    this.todosStore.patchFilters({ [key]: value });
  }

  protected clearAll(): void {
    this.todosStore.resetFilters();
  }
}
