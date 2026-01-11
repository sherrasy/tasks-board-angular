import { ChangeDetectionStrategy, Component, effect, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import { TFilterOption } from '../../../shared/types/filters.interface';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: './todo-filter.html',
  styleUrl: './todo-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFilter {
  public options = input.required<TFilterOption[]>();
  public label = input.required<string>();
  public value = input<string | null>(null);

  protected filterControl = new FormControl<string | null>(null);

  public valueChange = outputFromObservable(this.filterControl.valueChanges);

  constructor() {
    effect(() => {
      this.filterControl.setValue(this.value(), { emitEvent: false });
    });
  }
}
