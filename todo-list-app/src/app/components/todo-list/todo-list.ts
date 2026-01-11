import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteStateService } from '../../services/route-state/route-state';
import { Loader } from '../../shared/ui/loader/loader';
import { TodoListItem } from '../../shared/ui/todo-list-item/todo-list-item';
import { APP_ROUTES } from '../../shared/util/constants';
import { TodosStore } from '../../store/todos-store';
import { TranslocoModule } from '@jsverse/transloco';
import { TodoFilters } from '../todo-filters/todo-filters';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-todo-list',
  imports: [
    TodoListItem,
    Loader,
    TodoFilters,
    RouterOutlet,
    TranslocoModule,
    TodoFilters,
    MatIcon,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoList {
  protected readonly todosStore = inject(TodosStore);
  private readonly routeState: RouteStateService = inject(RouteStateService);

  protected showDetailsContainer = computed(() => !!this.todosStore.selectedItemId());

  constructor() {
    this.routeState.setupRouteListener(
      inject(DestroyRef),
      (id) => this.todosStore.setSelectedItemId(id),
      [APP_ROUTES.TASKS]
    );

    effect(() => {
      const selectedId = this.todosStore.selectedItemId();
      this.routeState.navigateWithId(APP_ROUTES.TASKS, selectedId);
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.todosStore.setSearchQuery(value);
  }
}
