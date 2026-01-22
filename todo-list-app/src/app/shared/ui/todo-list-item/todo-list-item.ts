import { CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';
import { ValidatorErrMessageService } from '../../../services/validator-error-message/validator-error-message';
import { TodosStore } from '../../../store/todos-store';
import { ShowTooltip } from '../../directives/show-tooltip';
import { ITodoItem } from '../../types/todo-item.interface';
import { TODO_STATUS, TOOLTIP_TEXT } from '../../util/constants';
import { Button } from '../button/button';

@Component({
  selector: 'app-todo-list-item',
  imports: [
    Button,
    CommonModule,
    ShowTooltip,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TranslocoModule,
    CdkDragPlaceholder,
  ],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListItem {
  protected readonly errorService: ValidatorErrMessageService = inject(ValidatorErrMessageService);
  private readonly todosStore = inject(TodosStore);

  protected TOOLTIP_TEXT = TOOLTIP_TEXT;

  public currentTodo = input.required<ITodoItem>();

  protected isSelected: Signal<boolean> = computed(
    () => this.todosStore.selectedItemId() === this.currentTodo().id,
  );

  protected isEditing: Signal<boolean> = computed(
    () => this.todosStore.editingItemId() === this.currentTodo().id,
  );

  protected isCompleted: Signal<boolean> = computed(
    () => this.currentTodo().status === TODO_STATUS.COMPLETED,
  );

  protected handleRemoveTodo(e: Event, id: string) {
    e.stopPropagation();
    this.todosStore.deleteTodoById(id);
  }

  protected handleTodoClick(id: string) {
    this.todosStore.setSelectedItemId(id);
  }

  protected onCheckboxChange(e: MatCheckboxChange) {
    this.todosStore.updateTodo({
      ...this.currentTodo(),
      status: e.checked ? TODO_STATUS.COMPLETED : TODO_STATUS.INPROGRESS,
      completedSprint: e.checked ? this.currentTodo().sprint : null,
    });
  }
}
