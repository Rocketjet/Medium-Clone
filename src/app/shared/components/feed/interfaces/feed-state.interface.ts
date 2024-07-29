import { GetFeedResponseInterface } from './get-feed-response.interface';

export interface FeedStateInterface {
  isLoading: boolean;
  error: string | null;
  feed: GetFeedResponseInterface | null;
}
