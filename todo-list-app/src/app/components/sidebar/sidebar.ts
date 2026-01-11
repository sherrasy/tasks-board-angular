import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslocoModule } from '@jsverse/transloco';
import { Nav } from './nav/nav';
import { TodoForm } from './todo-form/todo-form';
import { HideForUnauthorized } from '../../shared/directives/hide-for-unauthorized';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-sidebar',
  imports: [
    Nav,
    MatIcon,
    MatButtonModule,
    MatDialogModule,
    TranslocoModule,
    HideForUnauthorized,
    Button,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private dialog = inject(MatDialog);

  openCreateTodo() {
    this.dialog.open(TodoForm, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: 'first-tabbable',
      panelClass: 'custom-todo-dialog',
    });
  }
}
