import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';

import { ValidatorErrMessageService } from '../../services/validator-error-message/validator-error-message';
import { trimmedMinLength } from '../../shared/validators/trimmed-minlength.validator';
import { Button } from '../../shared/ui/button/button';
import { AuthStore } from '../../store/auth-store';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Loader } from '../../shared/ui/loader/loader';
// TODO: паттерн пароля вместо тестового 12345
@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    Button,
    MatSelectModule,
    MatOption,
    Loader,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  protected readonly errorService = inject(ValidatorErrMessageService);
  protected readonly authStore = inject(AuthStore);

  isRegisterMode = false;

  protected loginForm = this.formBuilder.group({
    userId: this.formBuilder.control<string>('', [Validators.required]),
    password: this.formBuilder.control<string>('', [Validators.required, trimmedMinLength(5)]),
  });

  protected registerForm = this.formBuilder.group({
    name: this.formBuilder.control<string>('', [
      Validators.required,
      trimmedMinLength(2),
      Validators.maxLength(45),
    ]),
    password: this.formBuilder.control<string>('', [Validators.required, trimmedMinLength(5)]),
  });

  protected toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  protected onLogin(e: Event): void {
    e.preventDefault();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    const { userId, password } = this.loginForm.getRawValue();
    this.authStore.login({ userId, pass: password });
    this.loginForm.reset();
  }

  protected onRegister(e: Event): void {
    e.preventDefault();
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    const { name, password } = this.registerForm.getRawValue();
    this.authStore.register({ name, pass: password });

    this.toggleMode();
  }
}
