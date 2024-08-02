import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfileInterface } from '../interfaces/user-profile.interface';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    getUserProfile: props<{ slug: string }>(),
    getUserProfileSuccess: props<{ userProfile: UserProfileInterface }>(),
    getUserProfileFailure: emptyProps(),
  },
});
