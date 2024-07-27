import { UserInterface } from 'src/app/shared/interfaces/user.interface';

//? auth-response а не register-response по тій причині, що ми отримаємо таку ж відповідь від сервера не тільки для реєстрації
export interface AuthResponseInterface {
  user: UserInterface;
}
