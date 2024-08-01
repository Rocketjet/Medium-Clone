//? Тут створюються ефекти, які потрібні для виконання асинхронний дій, наприклад api calls

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import authActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';

//! коли тригериться дія, вказана в ofType, виконається код в наступному операторі, де, як правило, буде виконуватися якась асинхронна дія. Якщо кол успішний, тригериться success action. Якщо неуспішний, помилка попаде в catchError і тригериться failure action

export const getCurrentUserEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const authToken = persistanceService.get('authToken');
        if (!authToken) {
          return of(authActions.getCurrentUserFailure());
        }
        return authService.getCurrentUser().pipe(
          map((user) => authActions.getCurrentUserSuccess({ user })),
          catchError(() => of(authActions.getCurrentUserFailure()))
        );
      })
    );
  },
  { functional: true }
);

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) =>
    actions$.pipe(
      ofType(authActions.register), //? таким чином ми обмежуємо стрім actions до єдиного потрібного екшена register
      switchMap(({ request }) =>
        //? в нас є доступ до request тому, що він передається в props екшена register і попадає в стрім actions$
        authService.register(request).pipe(
          map((user) => {
            persistanceService.set('authToken', user.token);
            return authActions.registerSuccess({ user }); //? повертаючи виклик цього екшена, він далі буде переданий в dispatch автоматично після чого спрацює відповідний reducer
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        )
      ) //? отримуємо request, який було передано з компонента екшену register через dispatch і далі передаємо у відповідний метод сервіcа authService
    ), //? 1 аргумент метода createEffect це EffectConfig
  { functional: true } //? 2 аргумент вказує на те, що ми пишемо ефект у функціональному стилі а не через клас
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/'); //? редіректимо на головну сторінку
      })
    ),
  { functional: true, dispatch: false } //dispatch: false означає, що в результаті виконання цього ефекту ніякі екшени не діспатчитимуться
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) =>
    actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) =>
        authService.login(request).pipe(
          map((user) => {
            persistanceService.set('authToken', user.token);
            return authActions.loginSuccess({ user });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        )
      )
    ),
  { functional: true }
);

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    ),
  { functional: true, dispatch: false }
);
