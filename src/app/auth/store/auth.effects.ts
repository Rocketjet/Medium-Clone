//? Тут створюються ефекти, які потрібні для виконання асинхронний дій, наприклад api calls

import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import authActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';
import { HttpErrorResponse } from '@angular/common/http';

//! коли тригериться дія, вказана в ofType, виконається код в switchMap, де виконується api call через метод з authService. Якщо кол успішний, тригериться registerSuccess action. Якщо неуспішний, помилка попаде в catchError і тригериться registerFailure action

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(authActions.register), //? таким чином ми обмежуємо стрім actions до єдиного потрібного екшена register
      switchMap(({ request }) =>
        authService
          .register(request)
          .pipe(map((user) => authActions.registerSuccess({ user })))
      ), //? отримуємо request, який було передано з компонента екшену register через dispatch і далі передаємо у відповідний метод сервіcа authService
      catchError((errorResponse: HttpErrorResponse) => {
        return of(authActions.registerFailure({
          errors: errorResponse.error.errors,
        }));
      })
    ), //? 1 аргумент метода createEffect це EffectConfig
  { functional: true } //? 2 аргумент вказує на те, що ми пишемо ефект у функціональному стилі а не через клас
);
