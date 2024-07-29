import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '', // Home page
    loadChildren: () =>
      import('src/app/main/global-feed/global-feed.routes').then(
        (m) => m.globalFeedRoutes
      ),
  },
];
