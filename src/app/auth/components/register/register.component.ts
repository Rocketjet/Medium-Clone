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
import { ResponseErrorMessagesComponent } from 'src/app/shared/interfaces/components/response-error-messages/response-error-messages.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ResponseErrorMessagesComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  store = inject(Store<AppStateInterface>);
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    responseErrors: this.store.select(selectValidationErrors),
  });
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('OnInit fired');
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request })); //? викликаючи метод dispatch ми повідомляємо ngrx store про виконання вказаної дії
  }
}
