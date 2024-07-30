import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import * as authEffects from './auth/store/auth.effects';
import * as feedEffects from './shared/components/feed/store/feed.effects';
import * as popularTagsEffects from './shared/components/popular-tags/store/popular-tags.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/auth.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { authInterceptor } from './auth/interceptors/auth.interceptor';
import {
  feedFeatureKey,
  feedReducer,
} from './shared/components/feed/store/feed.reducer';
import { popularTagsFeatureKey, popularTagsReducer } from './shared/components/popular-tags/store/popular-tags.reducer';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ router: routerReducer }),
    provideEffects(authEffects, feedEffects, popularTagsEffects),
    //ефекти можна реєструвати тут - глобально, і в роутах, передаючи в providers[]
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideStoreDevtools({
      maxAge: 25, // максимальна кількість дій
      logOnly: !isDevMode(),
      autoPause: true, // зупиняє роботу інструмента, коли вікно розширення закрите
      trace: false, // відслідковувати чи ні stack trace для кожного застосованої дії
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
