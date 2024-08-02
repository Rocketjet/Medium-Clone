import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { UserProfileStateInterface } from '../interfaces/user-profile-state.interface';
import { userProfileActions } from './user-profile.actions';

const initialState: UserProfileStateInterface = {
  isLoading: false,
  error: null,
  userProfile: null,
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      userProfile: actions.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectUserProfile: selectUserProfile,
} = userProfileFeature;
