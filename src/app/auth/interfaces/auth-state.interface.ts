import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  user: UserInterface | null | undefined;
  //? undefined означає, що ми ще не знаємо чи юзер залогінений чи ні
  //? null означає, що ми не авторизовані
  validationErrors: ResponseErrorInterface | null;
}
