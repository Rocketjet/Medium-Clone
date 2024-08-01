import { Route } from '@angular/router';
import { CreateArticleComponent } from './components/create-article.component';
import { ApiCreateArticleService } from './services/api-create-article.service';
import { provideEffects } from '@ngrx/effects';
import * as createArticleEffects from './store/create-article.effects';
import { provideState } from '@ngrx/store';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './store/create-article.reducer';

export const createArticleRoutes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      ApiCreateArticleService, //? вказуємо сервіс на рівні маршрута по тій причині, що він нам глобально не потрібен, а лише для конкретного lazy-loaded компонента
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
];
