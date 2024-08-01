import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleRequestInterface } from 'src/app/shared/interfaces/article-request.interface';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';

export const editArticleActions = createActionGroup({
  source: 'edit article',
  events: {
    getArticle: props<{ slug: string }>(),
    getArticleSuccess: props<{ article: ArticleInterface }>(),
    getArticleFailure: emptyProps(),

    'Edit article': props<{ request: ArticleRequestInterface; slug: string }>(),
    editArticleSuccess: props<{ article: ArticleInterface }>(),
    editArticleFailure: props<{ errors: ResponseErrorInterface }>(),
  },
});
