import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { feedActions } from './feed.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { GetFeedResponseInterface } from '../interfaces/get-feed-response.interface';
import { ApiFeedService } from '../services/api-feed.service';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), apiFeedService = inject(ApiFeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) => {
        return apiFeedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({ feed });
          }),
          catchError(() => {
            return of(feedActions.getFeedFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
