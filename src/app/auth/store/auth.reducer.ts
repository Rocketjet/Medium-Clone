//? В цьому файлі будуть зареєстровані дії, які змінюють стан
import { createFeature, createReducer, on } from '@ngrx/store';
import authActions from './auth.actions';
import { AuthStateInterface } from '../interfaces/auth-state.interface';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  user: undefined,
  validationErrors: null,
};

//? обгортка над reducer куди передається сам reducer (і одночасно створюється) і його назва
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    //? метод on() асоціює передану дію з коллбеком, який передається останнім аргументом і який відповідальний за зміну стану

    //? register and login
    on(authActions.register, authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(
      authActions.registerSuccess,
      authActions.loginSuccess,
      (state, { user }) => ({
        ...state,
        isSubmitting: false,
        user,
      })
    ),
    on(
      authActions.registerFailure,
      authActions.loginFailure,
      (state, { errors }) => ({
        ...state,
        isSubmitting: false,
        validationErrors: errors,
      })
    ),

    //? logout
    on(authActions.logout, (state) => ({
      ...state,
      ...initialState,
      user: null,
    })),

    //? get user
    on(authActions.getUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getUserSuccess, (state, { user }) => ({
      ...state,
      isLoading: false,
      user,
    })),
    on(authActions.getUserFailure, (state) => ({
      ...state,
      isLoading: false,
      user: null,
    })),

    //? update user
    on(authActions.updateUserSuccess, (state, { user }) => ({
      ...state,
      user,
    })),

    //? navigation
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    }))
  ),
});

export const {
  name: authFeatureKey, //для імпорту в provideStore()
  reducer: authReducer, //для імпорту в provideStore()
  selectIsSubmitting,
  selectValidationErrors,
  selectUser,
  selectIsLoading,
} = authFeature;
//? селектори типу selectIsSubmitting надаються нам "з коробки" методом createFeature()
