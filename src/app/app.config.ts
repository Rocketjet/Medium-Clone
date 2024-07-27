import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import * as authEffects from './auth/store/auth.effects'
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/auth.reducer';
import { reducers } from './app.store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideEffects(authEffects),
    // provideState(authFeatureKey, authReducer),
    provideStoreDevtools({
      maxAge: 25, // максимальна кількість дій
      logOnly: !isDevMode(),
      autoPause: true, // зупиняє роботу інструмента, коли вікно розширення закрите
      trace: false, // відслідковувати чи ні stack trace для кожного застосованої дії
    }),
    provideHttpClient(),
  ],
};
