import { createFeature, createReducer, on } from '@ngrx/store';
import { FeedStateInterface } from '../interfaces/feed-state.interface';
import { feedActions } from './feed.actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  feed: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state) => ({ ...state, isLoading: true })),
    on(feedActions.getFeedSuccess, (state, { feed }) => ({
      ...state,
      isLoading: false,
      feed,
    })),
    on(feedActions.getFeedFailure, (state) => ({ ...state, isLoading: false })),
    on(routerNavigationAction, () => initialState) //? ресетимо стейт коли змінюється маршрут
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectFeed,
} = feedFeature;
