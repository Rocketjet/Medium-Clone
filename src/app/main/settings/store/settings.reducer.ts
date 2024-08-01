import { createFeature, createReducer, on } from '@ngrx/store';
import { SettingsStateInterface } from '../interfaces.ts/settings-state.interface';
import authActions from 'src/app/auth/store/auth.actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateUser, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateUserSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: settingsFeatureKey,
  reducer: settingReducer,
  selectValidationErrors,
  selectIsSubmitting,
} = settingsFeature;
