import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';

import { articleActions } from './article.actions';
import { ArticleStateInterface } from '../interfaces/article-state.interface';

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  article: null,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.getArticle, (state) => ({ ...state, isLoading: true })),
    on(articleActions.getArticleSuccess, (state, { article }) => ({
      ...state,
      isLoading: false,
      article,
    })),
    on(articleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsLoading,
  selectError,
  selectArticle,
} = articleFeature;
