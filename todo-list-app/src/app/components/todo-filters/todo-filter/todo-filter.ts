import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import { TFilterOption } from '../../../shared/types/filters.interface';

@Component({
  selector: 'app-todo-filter',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, TranslocoModule],
  templateUrl: './todo-filter.html',
  styleUrl: './todo-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFilter {
  public options = input.required<TFilterOption[]>();
  public value = input<string | null>(null);
  public label = input.required<string>();

  protected valueChange = output<string | null>();

  protected onValueChange(newValue: string | null): void {
    this.valueChange.emit(newValue);
  }
}
