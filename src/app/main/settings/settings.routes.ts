import { Route } from '@angular/router';
import { SettingsComponent } from './components/settings.component';
import { provideState } from '@ngrx/store';
import { settingReducer, settingsFeatureKey } from './store/settings.reducer';

export const settingsRoutes: Route[] = [
  {
    path: '',
    component: SettingsComponent,
    providers: [provideState(settingsFeatureKey, settingReducer)],
  },
];
