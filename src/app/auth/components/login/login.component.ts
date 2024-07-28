import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import authActions from '../../store/auth.actions';
import { RouterLink } from '@angular/router';
import { AppStateInterface } from 'src/app/app.interfaces';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/auth.reducer';
import { combineLatest } from 'rxjs';
import { ValidationErrorMessagesComponent } from 'src/app/shared/components/response-error-messages/validation-error-messages.component';
import { LoginRequestInterface } from '../../interfaces/login-request.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ValidationErrorMessagesComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  store = inject(Store<AppStateInterface>);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    validationErrors: this.store.select(selectValidationErrors),
  });
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('OnInit fired');
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request })); //? викликаючи метод dispatch ми повідомляємо ngrx store про виконання вказаної дії
  }
}
