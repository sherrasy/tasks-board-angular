import { Component, computed, DestroyRef, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouteStateService } from '../../services/route-state/route-state';
import { Loader } from '../../shared/ui/loader/loader';
import { TodoListItem } from '../../shared/ui/todo-list-item/todo-list-item';
import { APP_ROUTES, TODO_STATUS } from '../../shared/util/constants';
import { TodosStore } from '../../store/todos-store';
import { TranslocoModule } from '@jsverse/transloco';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITodoItem } from '../../shared/types/todo-item.interface';

@Component({
  selector: 'app-todo-board',
  imports: [TodoListItem, Loader, RouterOutlet, TranslocoModule, CdkDropList, CdkDrag],
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
      [APP_ROUTES.BOARD]
    );

    effect(() => {
      const selectedId = this.todosStore.selectedItemId();
      this.routeState.navigateWithId(APP_ROUTES.BOARD, selectedId);
    });
  }

  private getNewStatus(dropListId: string) {
    switch (dropListId) {
      case 'newTodos':
        return TODO_STATUS.NEW;
      case 'incompleteTodos':
        return TODO_STATUS.INPROGRESS;
      case 'completedTodos':
        return TODO_STATUS.COMPLETED;
      default:
        return TODO_STATUS.NEW;
    }
  }

  protected drop(event: CdkDragDrop<ITodoItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const todo = event.container.data[event.currentIndex];
      const newStatus = this.getNewStatus(event.container.id);
      if (!todo) return;
      this.todosStore.updateTodo({
        ...todo,
        status: newStatus,
      });
    }
  }
}
