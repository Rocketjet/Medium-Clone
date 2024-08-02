import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiUserProfileService } from '../services/api-user-profile.service';
import { UserProfileInterface } from '../interfaces/user-profile.interface';
import { userProfileActions } from './user-profile.actions';

export const getUserProfileEffect = createEffect(
  (
    actions$ = inject(Actions),
    userProfileService = inject(ApiUserProfileService)
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({ slug }) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) => {
            return userProfileActions.getUserProfileSuccess({ userProfile });
          }),
          catchError(() => {
            return of(userProfileActions.getUserProfileFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
