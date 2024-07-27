import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  user: UserInterface | null | undefined;
  validationErrors: ResponseErrorInterface | null;
}
