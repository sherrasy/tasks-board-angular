import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ITodoItem } from '../../../shared/types/todo-item.interface';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthStore } from '../../../store/auth-store';
import { formatDuration } from '../../../shared/util/helpers';

@Component({
  selector: 'app-todo-details',
  imports: [TranslocoModule],
  templateUrl: './todo-details.html',
  styleUrl: './todo-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetails {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authStore = inject(AuthStore);
  private readonly todo = toSignal(
    this.activatedRoute.data.pipe(map((data) => data['todo'] as ITodoItem | null))
  );

  protected currentTodo = computed(() => this.todo());

  protected assigneeName = computed(() => {
    const id = this.todo()?.assignee;
    return id ? this.authStore.getUserNameById(id) : null;
  });

  protected reporterName = computed(() => {
    const id = this.todo()?.reporter;
    return id ? this.authStore.getUserNameById(id) : 'Unknown';
  });

  protected formattedEstimate = computed(() => {
    const estimate = this.todo()?.estimate;
    return estimate !== undefined ? formatDuration(estimate) : null;
  });
}
