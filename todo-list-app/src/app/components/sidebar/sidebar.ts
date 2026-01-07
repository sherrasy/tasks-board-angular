import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { Nav } from './nav/nav';
import { TodoForm } from './todo-form/todo-form';
import { HideForUnauthorized } from '../../shared/directives/hide-for-unauthorized';

@Component({
  selector: 'app-sidebar',
  imports: [Nav, TodoForm, MatIcon, TranslocoModule, HideForUnauthorized],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {}
