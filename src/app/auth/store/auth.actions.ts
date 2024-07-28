import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from 'src/app/auth/interfaces/register-request.interface';
import { BackendErrorsInterface } from 'src/app/shared/interfaces/backend-errors.interface';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { LoginRequestInterface } from '../interfaces/login-request.interface';

const authActions = createActionGroup({
  source: 'auth',
  events: {
    register: props<{ request: RegisterRequestInterface }>(),
    registerSuccess: props<{ user: UserInterface }>(),
    registerFailure: props<{ errors: BackendErrorsInterface }>(),

    login: props<{ request: LoginRequestInterface }>(),
    loginSuccess: props<{ user: UserInterface }>(),
    loginFailure: props<{ errors: BackendErrorsInterface }>(),

    getCurrentUser: emptyProps(),
    getCurrentUserSuccess: props<{ user: UserInterface }>(),
    getCurrentUserFailure: emptyProps(),
  },
});

export default authActions;

//! Старий більш громіздкий підхід
/* export const register = createAction(
  '[Auth] Register', //? назва дії має бути унікальною, так як NgRx зберігає всі дії в одному глобальному об'єкті
  props<{ request: RegisterRequestInterface }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: RegisterRequestInterface }>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ errors: any }>()
); */
