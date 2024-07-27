//! Цей код не використовується, так як createFeature() з коробки надає нам потрібні селектори
/* import { createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../interfaces/auth-state.interface';
import { AppStateInterface } from 'src/app/app.interfaces';

export const selectAuthFeature = (state: AppStateInterface) =>
  state.auth; //? змінна, де буде зберігатися функція, яка повертає частину або slice глобального стану
export const selectIsSubmitting = createSelector(selectAuthFeature, (authData: AuthStateInterface) => authData.isSubmitting); //? селектор, який повертає значення певної частини стану зі slice */