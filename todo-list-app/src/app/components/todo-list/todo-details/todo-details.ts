import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { map } from 'rxjs';
import { Button } from '../../../shared/ui/button/button';
import { formatDuration } from '../../../shared/util/helpers';
import { AuthStore } from '../../../store/auth-store';
import { TodosStore } from '../../../store/todos-store';
import { TodoForm } from '../../sidebar/todo-form/todo-form';

@Component({
  selector: 'app-todo-details',
  imports: [TranslocoModule, Button, MatIcon],
  templateUrl: './todo-details.html',
  styleUrl: './todo-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetails {
  private readonly dialog = inject(MatDialog);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly todosStore = inject(TodosStore);
  private readonly authStore = inject(AuthStore);
  private readonly todoId = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('id')))
  );

  protected currentTodo = computed(() => {
    const id = this.todoId();
    return this.todosStore.todos().find((t) => t.id === id) || null;
  });

  protected assigneeName = computed(() => {
    const id = this.currentTodo()?.assignee;
    return id ? this.authStore.getUserNameById(id) : null;
  });

  protected reporterName = computed(() => {
    const id = this.currentTodo()?.reporter;
    return id ? this.authStore.getUserNameById(id) : 'Unknown';
  });

  protected formattedEstimate = computed(() => {
    const estimate = this.currentTodo()?.estimate;
    return estimate !== undefined ? formatDuration(estimate) : null;
  });

  protected onEdit(): void {
    const todo = this.currentTodo();
    if (!todo) return;

    this.dialog.open(TodoForm, {
      width: '600px',
      data: { todo },
    });
  }
}
