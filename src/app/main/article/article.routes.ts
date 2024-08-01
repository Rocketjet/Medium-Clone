import { Route } from '@angular/router';
import { ArticleComponent } from './components/article.component';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as articleEffects from './store/article.effects';
import { articleFeatureKey, articleReducer } from './store/article.reducer';
import { ApiArticleService } from 'src/app/shared/services/api-article.service';

export const articleRoutes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    //? ми не реєструємо ефекти і ред'юсер глобально, бо вони нам потрібні лише коли ми попадаємо на сторінку /articles
    providers: [
      ApiArticleService, //? вказуємо сервіс на рівні маршрута по тій причині, що він нам глобально не потрібен, а лише для конкретного lazy-loaded компонента
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];
