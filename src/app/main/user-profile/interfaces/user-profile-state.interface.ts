import { UserProfileInterface } from './user-profile.interface';

export interface UserProfileStateInterface {
  userProfile: UserProfileInterface | null;
  isLoading: boolean;
  error: string | null;
}
