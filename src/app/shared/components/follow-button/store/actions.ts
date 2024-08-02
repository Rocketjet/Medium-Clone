import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {UserProfileInterface} from 'src/app/user-profile/types/user-profile.interface'

export const followUserActions = createActionGroup({
  source: 'Follow user',
  events: {
    'Follow user': props<{isFollowed: boolean; username: string}>(),
    'Follow user success': props<{profile: UserProfileInterface}>(),
    'Follow user failure': emptyProps(),
  },
})
