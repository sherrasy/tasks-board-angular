import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_ROUTES } from '../../../shared/util/constants';
import { LangDefinition, TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { Button } from '../../../shared/ui/button/button';
import { MatIcon } from '@angular/material/icon';
import { AuthStore } from '../../../store/auth-store';
import { HideForUnauthorized } from '../../../shared/directives/hide-for-unauthorized';
interface NavLink {
  path: string;
  labelKey: string;
}
@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslocoModule,
    CommonModule,
    Button,
    MatIcon,
    HideForUnauthorized,
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  private translateService = inject(TranslocoService);
  protected availableLangs = this.translateService.getAvailableLangs() as LangDefinition[];
  protected activeLang = this.translateService.getActiveLang();
  protected readonly authStore = inject(AuthStore);
  protected readonly NAV_LINKS: NavLink[] = [
    { path: APP_ROUTES.TASKS, labelKey: 'common.taskList' },
    { path: APP_ROUTES.BOARD, labelKey: 'common.taskBoard' },
    { path: APP_ROUTES.USER_STATS, labelKey: 'stats.title' },
  ];
  public switchLang(lang: string): void {
    this.translateService.setActiveLang(lang);
    this.activeLang = lang;
  }
}
