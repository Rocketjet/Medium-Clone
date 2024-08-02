import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {UserProfileInterface} from 'src/app/user-profile/types/user-profile.interface'
import {ApiFollowUserService} from '../services/api-follow-user.service'
import {followUserActions} from './actions'

export const followUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    followUserService = inject(ApiFollowUserService)
  ) => {
    return actions$.pipe(
      ofType(followUserActions.followUser),
      switchMap(({isFollowed, username}) => {
        const profile$ = isFollowed
          ? followUserService.unfollowUser(username)
          : followUserService.followUser(username)
        return profile$.pipe(
          map((profile: UserProfileInterface) => {
            return followUserActions.followUserSuccess({profile})
          }),
          catchError(() => {
            return of(followUserActions.followUserFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
