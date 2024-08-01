import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleRequestInterface } from 'src/app/shared/interfaces/article-request.interface';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';

export const createArticleActions = createActionGroup({
  source: 'createArticle',
  events: {
    'createArticle': props<{ request: ArticleRequestInterface }>(),
    'createArticleSuccess': props<{ article: ArticleInterface }>(),
    'createArticleFailure': props<{ errors: ResponseErrorInterface }>(),
  },
});
