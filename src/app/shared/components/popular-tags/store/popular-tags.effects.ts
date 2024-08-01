import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { popularTagsActions } from './popular-tags.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiPopularTagService } from '../services/api-popular-tags.service';
import { PopularTagType } from 'src/app/shared/types/popular-tag.type';

export const getTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    apiPopularTagsService = inject(ApiPopularTagService)
  ) =>
    actions$.pipe(
      ofType(popularTagsActions.getTags),
      switchMap(() => {
        return apiPopularTagsService.getTags().pipe(
          map((tags: PopularTagType[]) =>
            popularTagsActions.getTagsSuccess({ tags })
          ),
          catchError(() => of(popularTagsActions.getTagsFailure()))
        );
      })
    ),
  { functional: true }
);
