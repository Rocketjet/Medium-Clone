import { FormControl } from '@angular/forms';

export interface SettingsFormInterface {
  image: FormControl<string>;
  username: FormControl<string>;
  bio: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
