import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';

export interface ArticleStateInterface {
  isLoading: boolean;
  error: string | null;
  article: ArticleInterface | null;
}
