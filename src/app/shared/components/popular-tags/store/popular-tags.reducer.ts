import { createFeature, createReducer, on } from '@ngrx/store';
import { PopularTagsStateInterface } from '../interfaces/popular-tags-state.interface';
import { popularTagsActions } from './popular-tags.actions';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  popularTags: null,
};

const popularTagsFeature = createFeature({
  name: 'popularTags',
  reducer: createReducer(
    initialState,
    on(
      popularTagsActions.getTags,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: true,
      })
    ),
    on(
      popularTagsActions.getTagsSuccess,
      (state, action): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
        popularTags: action.tags,
      })
    ),
    on(
      popularTagsActions.getTagsFailure,
      (state): PopularTagsStateInterface => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectPopularTags,
} = popularTagsFeature;
