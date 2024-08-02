import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';

export const addToFavoritesActions = createActionGroup({
  source: 'Add to favorites',
  events: {
    addToFavorites: props<{ isFavorited: boolean; slug: string }>(),
    addToFavoritesSuccess: props<{ article: ArticleInterface }>(),
    addToFavoritesFailure: emptyProps(),
  },
});
