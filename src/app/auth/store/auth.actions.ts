import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from 'src/app/auth/interfaces/register-request.interface';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { LoginRequestInterface } from '../interfaces/login-request.interface';
import { UserRequestInterface } from 'src/app/shared/interfaces/user-request.interface';

const authActions = createActionGroup({
  source: 'auth',
  events: {
    register: props<{ request: RegisterRequestInterface }>(),
    registerSuccess: props<{ user: UserInterface }>(),
    registerFailure: props<{ errors: ResponseErrorInterface }>(),

    login: props<{ request: LoginRequestInterface }>(),
    loginSuccess: props<{ user: UserInterface }>(),
    loginFailure: props<{ errors: ResponseErrorInterface }>(),

    getUser: emptyProps(),
    getUserSuccess: props<{ user: UserInterface }>(),
    getUserFailure: emptyProps(),

    updateUser: props<{ user: UserRequestInterface }>(),
    updateUserSuccess: props<{ user: UserInterface }>(),
    updateUserFailure: props<{ errors: ResponseErrorInterface; }>(),
    
    logout: emptyProps(),
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
