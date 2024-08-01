import { routerNavigationAction } from '@ngrx/router-store';
import { createFeature, createReducer, on } from '@ngrx/store';
import { EditArticleStateInterface } from '../interfaces/edit-article-state.interface';
import { editArticleActions } from './edit-article.actions';

const initialState: EditArticleStateInterface = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

const editArticleFeature = createFeature({
  name: 'editArticle',
  reducer: createReducer(
    initialState,
    on(editArticleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(editArticleActions.getArticleSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      article: actions.article,
    })),
    on(editArticleActions.getArticleFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(editArticleActions.editArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(editArticleActions.editArticleSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(editArticleActions.editArticleFailure, (state, actions) => ({
      ...state,
      isSubmitting: false,
      validationErrors: actions.errors,
    })),

    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} = editArticleFeature;
