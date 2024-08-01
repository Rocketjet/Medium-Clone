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
  {
    //? додаємо цей шлях перед articles/:slug, так як якщо додати навпаки, то при переході по articles/new спрацює першим articles/:slug
    path: 'articles/new',
    loadChildren: () =>
      import('src/app/main/create-article/create-article.routes').then(
        (m) => m.createArticleRoutes
      ),
  },
  {
    path: 'articles/:slug',
    loadChildren: () =>
      import('src/app/main/article/article.routes').then(
        (m) => m.articleRoutes
      ),
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () =>
      import('src/app/main/edit-article/edit-article.route').then(
        (m) => m.editArticleRoutes
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('src/app/main/settings/settings.routes').then(
        (m) => m.settingsRoutes
      ),
  },
];
