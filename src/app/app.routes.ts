import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'register', pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('src/app/auth/auth.routes').then(m => m.registerRoutes)
  }
];
