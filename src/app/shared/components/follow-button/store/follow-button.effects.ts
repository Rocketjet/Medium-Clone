import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiFollowUserService } from '../services/api-follow-user.service';
import { followUserActions } from './follow-button.actions';
import { ProfileInterface } from 'src/app/shared/interfaces/profile.interface';

export const followUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    followUserService = inject(ApiFollowUserService)
  ) => {
    return actions$.pipe(
      ofType(followUserActions.followUser),
      switchMap(({ isFollowed, username }) => {
        const profile$ = isFollowed
          ? followUserService.unFollowUser(username)
          : followUserService.followUser(username);
        return profile$.pipe(
          map((profile: ProfileInterface) => {
            return followUserActions.followUserSuccess({ profile });
          }),
          catchError(() => {
            return of(followUserActions.followUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
