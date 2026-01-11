import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, computed, DestroyRef, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { RouteStateService } from '../../services/route-state/route-state';
import { ITodoItem, TTodoStatus } from '../../shared/types/todo-item.interface';
import { Loader } from '../../shared/ui/loader/loader';
import { TodoListItem } from '../../shared/ui/todo-list-item/todo-list-item';
import { APP_ROUTES, TODO_STATUS } from '../../shared/util/constants';
import { TodosStore } from '../../store/todos-store';
import { TodoFilters } from '../todo-filters/todo-filters';

@Component({
  selector: 'app-todo-board',
  imports: [TodoListItem, TodoFilters, Loader, RouterOutlet, TranslocoModule, CdkDropList, CdkDrag],
  templateUrl: './todo-board.html',
  styleUrl: './todo-board.scss',
})
export class TodoBoard {
  protected readonly todosStore = inject(TodosStore);
  private readonly routeState = inject(RouteStateService);

  protected showDetailsContainer = computed(() => !!this.todosStore.selectedItemId());

  constructor() {
    this.routeState.setupRouteListener(
      inject(DestroyRef),
      (id) => this.todosStore.setSelectedItemId(id),
      [APP_ROUTES.BOARD],
      () => {
        this.todosStore.resetFilters();
      }
    );

    effect(() => {
      const selectedId = this.todosStore.selectedItemId();
      this.routeState.navigateWithId(APP_ROUTES.BOARD, selectedId);
    });
  }

  protected drop(event: CdkDragDrop<ITodoItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const todo = event.item.data as ITodoItem;
      const newStatus = this.getNewStatus(event.container.id);

      this.todosStore.updateTodo({
        ...todo,
        status: newStatus,
      });
    }
  }

  private getNewStatus(dropListId: string): TTodoStatus {
    const statusMap: Record<string, TTodoStatus> = {
      newTodos: TODO_STATUS.NEW,
      incompleteTodos: TODO_STATUS.INPROGRESS,
      completedTodos: TODO_STATUS.COMPLETED,
    };
    return statusMap[dropListId] || TODO_STATUS.NEW;
  }
}
