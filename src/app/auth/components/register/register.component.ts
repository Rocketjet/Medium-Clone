import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import authActions from '../../store/auth.actions';
import { RegisterRequestInterface } from 'src/app/auth/interfaces/register-request.interface';
import { RouterLink } from '@angular/router';
import { AppStateInterface } from 'src/app/app.interfaces';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/auth.reducer';
import { combineLatest } from 'rxjs';
import { ValidationErrorMessagesComponent } from 'src/app/shared/components/response-error-messages/validation-error-messages.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ValidationErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private readonly store = inject(Store<AppStateInterface>);
  private readonly fb = inject(FormBuilder);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
  });

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request })); //? викликаючи метод dispatch ми повідомляємо ngrx store про виконання вказаної дії
  }
}
