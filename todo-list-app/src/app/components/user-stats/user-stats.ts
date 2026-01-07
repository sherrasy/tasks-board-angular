import { Component, inject } from '@angular/core';
import { AuthStore } from '../../store/auth-store';
import { TodosStore } from '../../store/todos-store';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-stats',
  imports: [CommonModule, TranslocoModule, MatCardModule, MatTableModule],
  templateUrl: './user-stats.html',
  styleUrl: './user-stats.scss',
})
export class UserStats {
  protected readonly authStore = inject(AuthStore);
  protected readonly todosStore = inject(TodosStore);
  displayedColumns: string[] = ['name', 'total', 'completedCount', 'time'];
}
