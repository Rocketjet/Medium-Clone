import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';

export interface SettingsStateInterface {
  isSubmitting: boolean;
  validationErrors: ResponseErrorInterface | null;
}
