import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';

export interface CreateArticleStateInterface {
  isSubmitting: boolean;
  validationErrors: ResponseErrorInterface | null;
}
