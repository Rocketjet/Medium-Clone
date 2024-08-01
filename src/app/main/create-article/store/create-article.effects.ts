import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ApiCreateArticleService } from '../services/api-create-article.service';
import { createArticleActions } from './create-article.actions';

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    createArticleService = inject(ApiCreateArticleService)
  ) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({ request }) => {
        return createArticleService.createArticle(request).pipe(
          map((article) => {
            return createArticleActions.createArticleSuccess({
              article,
            });
          }),
          catchError((errorsResponse: HttpErrorResponse) => {
            return of(
              createArticleActions.createArticleFailure({
                errors: errorsResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterArticleCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
