import { Directive, effect, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthStore } from '../../store/auth-store';

@Directive({
  selector: '[appHideForUnauthorized]',
})
export class HideForUnauthorized {
  private readonly authStore = inject(AuthStore);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const isAuthenticated = this.authStore.isAuthenticated();

      this.viewContainer.clear();
      if (isAuthenticated) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}
