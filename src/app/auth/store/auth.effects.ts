//? Тут створюються ефекти, які потрібні для виконання асинхронний дій, наприклад api calls

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import authActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Router } from '@angular/router';

//! коли тригериться дія, вказана в ofType, виконається код в switchMap, де виконується api call через метод з authService. Якщо кол успішний, тригериться registerSuccess action. Якщо неуспішний, помилка попаде в catchError і тригериться registerFailure action

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) =>
    actions$.pipe(
      ofType(authActions.register), //? таким чином ми обмежуємо стрім actions до єдиного потрібного екшена register
      switchMap(({ request }) =>
        authService.register(request).pipe(
          map((user) => {
            persistanceService.set('accessToken', user.token);
            return authActions.registerSuccess({ user }); //? повертаючи виклик цього екшена, він далі буде переданий в dispatch автоматично після чого спрацює відповідний reducer
          })
        )
      ), //? отримуємо request, який було передано з компонента екшену register через dispatch і далі передаємо у відповідний метод сервіcа authService
      catchError((errorResponse: HttpErrorResponse) => {
        return of(
          authActions.registerFailure({
            errors: errorResponse.error.errors,
          })
        );
      })
    ), //? 1 аргумент метода createEffect це EffectConfig
  { functional: true } //? 2 аргумент вказує на те, що ми пишемо ефект у функціональному стилі а не через клас
);

export const redirectAfterRegisterEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    ),
  { functional: true, dispatch: false } //dispatch: false означає, що в цьому ефекті екшени діспатчитись не будуть
);
