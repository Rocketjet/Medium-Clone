//? В цьому файлі будуть зареєстровані дії, які змінюють стан
import { createFeature, createReducer, on } from '@ngrx/store';
import authActions from './auth.actions';
import { AuthStateInterface } from '../interfaces/auth-state.interface';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  user: undefined,
  isLoading: false,
  validationErrors: null,
};

//? обгортка над reducer куди передається сам reducer (і одночасно створюється) і його назва
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    //? метод on() асоціює передану дію з коллбеком, який передається останнім аргументом і який відповідальний за зміну стану
    on(authActions.registerSuccess, (state, { user }) => ({
      ...state,
      isSubmitting: false,
      user,
    })),
    on(authActions.registerFailure, (state, { errors }) => ({
      ...state,
      isSubmitting: false,
      validationErrors: errors,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectUser,
  selectIsLoading
} = authFeature;
//? селектор selectIsSubmitting надається нам "з коробки" методом createFeature()
