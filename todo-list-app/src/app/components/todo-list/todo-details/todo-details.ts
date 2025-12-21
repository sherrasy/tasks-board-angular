import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ITodoItem } from '../../../shared/types/todo-item.interface';
import { TranslocoModule } from '@jsverse/transloco';
import { formatDuration } from '../../../shared/util/helpers';

// TODO: редактирование полей? фикс высоты

@Component({
  selector: 'app-todo-details',
  imports: [TranslocoModule],
  templateUrl: './todo-details.html',
  styleUrl: './todo-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetails {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly todo = toSignal(
    this.activatedRoute.data.pipe(map((data) => data['todo'] as ITodoItem | null))
  );

  protected currentTodo = computed(() => this.todo());

  protected formattedEstimate = computed(() => {
    const estimate = this.todo()?.estimate;
    return estimate !== undefined ? formatDuration(estimate) : null;
  });
}
