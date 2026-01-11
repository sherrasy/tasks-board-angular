import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

type TAppButton = 'submit' | 'delete' | 'simple';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  public type = input.required<TAppButton>();
  public isDisabled = input<boolean>(false);

  public action = output<Event>();
  public buttonClass = computed(() => {
    const mapping: Record<string, string> = {
      submit: 'add-button',
      delete: 'delete-button',
      simple: 'simple-button',
    };
    return mapping[this.type()];
  });

  public handleClick(event: Event) {
    console.log(this.type(), this.action, this.buttonClass());
    if (this.isDisabled()) return;
    this.action.emit(event);
  }
}
