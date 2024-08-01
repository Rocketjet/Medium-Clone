import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter } from 'rxjs';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { SettingsFormInterface } from '../interfaces.ts/settings-form.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../store/settings.reducer';
import { UserRequestInterface } from 'src/app/shared/interfaces/user-request.interface';
import { ResponseErrorMessagesComponent } from 'src/app/shared/components/response-error-messages/response-error-messages.component';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';
import { selectUser } from 'src/app/auth/store/auth.reducer';
import authActions from 'src/app/auth/store/auth.actions';

interface SettingsFormData {
  isSubmitting: boolean;
  responseErrors: ResponseErrorInterface | null;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ResponseErrorMessagesComponent,
  ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly store: Store = inject(Store);

  user!: UserInterface;
  form: FormGroup<SettingsFormInterface> = this.fb.nonNullable.group({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });
  data$!: Observable<SettingsFormData>;

  private userSubscription?: Subscription;

  ngOnInit(): void {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      responseErrors: this.store.select(selectValidationErrors),
    });

    this.userSubscription = this.store
      .pipe(select(selectUser), filter(Boolean))
      .subscribe((user) => {
        this.user = user;
        this.initializeForm();
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  onSubmit(): void {
    if (!this.user) {
      throw new Error('User is not set.');
    }
    const userRequest: UserRequestInterface = {
      user: { ...this.user, ...this.form.getRawValue() },
    };

    this.store.dispatch(authActions.updateUser({ user: userRequest }));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }

  private initializeForm(): void {
    if (!this.user) {
      throw new Error('User is not set.');
    }
    this.form.patchValue({
      image: this.user.image ?? '',
      username: this.user.username,
      bio: this.user.bio ?? '',
      email: this.user.email,
      password: '',
    });
  }
}
