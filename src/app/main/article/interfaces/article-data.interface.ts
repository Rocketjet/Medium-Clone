import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';

export interface ArticleDataInterface {
  isLoading: boolean
  error: string | null
  article: ArticleInterface | null
  isAuthor: boolean
  // user: UserInterface | null
}