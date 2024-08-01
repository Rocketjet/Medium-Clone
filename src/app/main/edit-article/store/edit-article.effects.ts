import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ApiEditArticleService } from '../services/api-edit-article.service';
import { editArticleActions } from './edit-article.actions';
import { ApiArticleService } from 'src/app/shared/services/api-article.service';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';

export const getArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ApiArticleService)) => {
    return actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.getArticleSuccess({ article });
          }),
          catchError(() => {
            return of(editArticleActions.getArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const editArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    editArticleService = inject(ApiEditArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.editArticle),
      switchMap(({ request, slug }) => {
        return editArticleService.editArticle(request, slug).pipe(
          map((article) => {
            return editArticleActions.editArticleSuccess({
              article,
            });
          }),
          catchError((errorsResponse: HttpErrorResponse) => {
            return of(
              editArticleActions.editArticleFailure({
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

export const redirectAfterEditCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(editArticleActions.editArticleSuccess),
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
