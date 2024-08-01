import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { EditArticleComponent } from './components/edit-article.component';
import { ApiEditArticleService } from './services/api-edit-article.service';
import {
  editArticleFeatureKey,
  editArticleReducer,
} from './store/edit-article.reducer';
import * as editArticleEffect from './store/edit-article.effects';

export const editArticleRoutes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      ApiEditArticleService,
      provideEffects(editArticleEffect),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
];
