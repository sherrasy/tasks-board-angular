import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { ValidatorErrMessageService } from '../../../services/validator-error-message/validator-error-message';
import { ShowTooltip } from '../../../shared/directives/show-tooltip';
import { Button } from '../../../shared/ui/button/button';
import {
  TOOLTIP_TEXT,
  TASK_PRIORITY,
  TASK_LABELS,
  TODO_STATUS,
} from '../../../shared/util/constants';
import { trimmedMinLength } from '../../../shared/validators/trimmed-minlength.validator';
import { TodosStore } from '../../../store/todos-store';
import { AuthStore } from '../../../store/auth-store';
import { TranslocoModule } from '@jsverse/transloco';
import { ITodoItem, TTaskLabel, TTaskPriority } from '../../../shared/types/todo-item.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    Button,
    CommonModule,
    ShowTooltip,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoForm {
  protected data = inject<{ todo?: ITodoItem }>(MAT_DIALOG_DATA, { optional: true });
  protected readonly isEditMode = !!this.data?.todo;

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly todosStore = inject(TodosStore);
  private readonly authStore = inject(AuthStore);
  private readonly dialogRef = inject(MatDialogRef<TodoForm>, { optional: true });

  protected readonly errorService = inject(ValidatorErrMessageService);
  protected readonly TOOLTIP_TEXT = TOOLTIP_TEXT;

  protected readonly priorities = Object.values(TASK_PRIORITY);
  protected readonly availableLabels = Object.values(TASK_LABELS);

  private readonly HOUR_TO_MS = 3_600_000;

  protected newTodoForm = this.fb.group({
    name: [
      this.data?.todo?.name ?? '',
      [Validators.required, trimmedMinLength(3), Validators.maxLength(45)],
    ],
    description: [
      this.data?.todo?.description ?? '',
      [Validators.required, trimmedMinLength(3), Validators.maxLength(255)],
    ],
    priority: [
      this.data?.todo?.priority ?? (TASK_PRIORITY.MEDIUM as TTaskPriority),
      [Validators.required],
    ],
    estimateHours: [
      (this.data?.todo?.estimate ?? this.HOUR_TO_MS) / this.HOUR_TO_MS,
      [Validators.required, Validators.min(0.1)],
    ],
    labels: [this.data?.todo?.labels ?? ([] as TTaskLabel[])],
    sprint: [this.data?.todo?.sprint ?? '', [Validators.maxLength(50)]],
    assignee: [this.data?.todo?.assignee ?? this.authStore.currentUserId()],
  });

  protected onSubmit(e: Event): void {
    e.preventDefault();

    if (this.newTodoForm.valid) {
      const { estimateHours, labels, ...formValue } = this.newTodoForm.getRawValue();
      const payload = {
        ...formValue,
        estimate: Math.round(estimateHours * 3600000),
        labels: labels as TTaskLabel[],
      };

      if (this.isEditMode && this.data?.todo) {
        this.todosStore.updateTodo({
          ...this.data.todo,
          ...payload,
        });
      } else {
        this.todosStore.addNewTodo({
          ...payload,
          reporter: this.authStore.currentUserId() as string,
          status: TODO_STATUS.NEW,
          completedSprint: null,
        });
      }

      this.dialogRef?.close();
    } else {
      this.newTodoForm.markAllAsTouched();
    }
  }

  protected onCancel(): void {
    this.dialogRef?.close();
  }
}
