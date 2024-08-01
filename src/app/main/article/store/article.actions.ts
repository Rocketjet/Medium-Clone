import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    getArticle: props<{ slug: string }>(),
    getArticleSuccess: props<{ article: ArticleInterface }>(),
    getArticleFailure: emptyProps(),

    deleteArticle: props<{ slug: string }>(),
    deleteArticleSuccess: emptyProps(),
    deleteArticleFailure: emptyProps(),
  },
});
