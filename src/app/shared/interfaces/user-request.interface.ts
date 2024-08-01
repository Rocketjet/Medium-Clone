import { UserInterface } from './user.interface';

export interface UserRequestInterface {
  user: UserInterface & { password: string };
}
