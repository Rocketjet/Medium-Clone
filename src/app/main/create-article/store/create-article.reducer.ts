import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { CreateArticleStateInterface } from '../interfaces/create-article-state.interface';
import { createArticleActions } from './create-article.actions';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleFeature = createFeature({
  name: 'create article',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    })),
    on(createArticleActions.createArticleSuccess, (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleActions.createArticleFailure, (state, actions): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: actions.errors,
    })),
    
    on(routerNavigationAction, (): CreateArticleStateInterface => initialState)
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature;
