import { ActionReducerMap } from '@ngrx/store';
import { AppStateInterface } from './app.interfaces';
import { authReducer } from './auth/store/auth.reducer';

export const reducers: ActionReducerMap<AppStateInterface> = {
  auth: authReducer
}