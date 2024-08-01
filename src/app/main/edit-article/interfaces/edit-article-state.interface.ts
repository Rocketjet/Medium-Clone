import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';

export interface EditArticleStateInterface {
  article: ArticleInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: ResponseErrorInterface | null;
}
