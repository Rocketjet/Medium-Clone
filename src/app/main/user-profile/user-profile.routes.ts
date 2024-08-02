import { Route } from '@angular/router';
import { UserProfileComponent } from './components/user-profile.component';
import { ApiUserProfileService } from './services/api-user-profile.service';
import { provideState } from '@ngrx/store';
import {
  userProfileFeatureKey,
  userProfileReducer,
} from './store/user-profile.reducer';
import * as userProfileEffects from './store/user-profile.effects';
import { provideEffects } from '@ngrx/effects';

export const userProfileRoutes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      ApiUserProfileService,
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(userProfileEffects),
    ],
  },
];
