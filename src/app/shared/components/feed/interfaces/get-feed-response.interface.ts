import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';

export interface GetFeedResponseInterface {
  articles: ArticleInterface[];
  articlesCount: number;
}
