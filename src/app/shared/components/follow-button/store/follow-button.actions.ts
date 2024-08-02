import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProfileInterface } from 'src/app/shared/interfaces/profile.interface';

export const followUserActions = createActionGroup({
  source: 'Follow user',
  events: {
    followUser: props<{ isFollowed: boolean; username: string }>(),
    followUserSuccess: props<{ profile: ProfileInterface }>(),
    followUserFailure: emptyProps(),
  },
});
