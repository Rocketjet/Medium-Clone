import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', // Home page
    loadChildren: () =>
      import('src/app/main/global-feed/global-feed.routes').then(
        (m) => m.globalFeedRoutes
      ),
  },
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
    path: 'feed',
    loadChildren: () =>
      import('src/app/main/your-feed/your-feed.routes').then(
        (m) => m.yourFeedRoutes
      ),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('src/app/main/tag-feed/tag-feed.routes').then(
        (m) => m.tagFeedRoutes
      ),
  },
];
