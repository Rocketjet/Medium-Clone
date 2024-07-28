import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistanceService } from './persistance.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const persistanceService = inject(PersistanceService);
  const authToken = persistanceService.get('authToken');
  console.log(authToken);
  req = req.clone({
    setHeaders: {
      Authorization: authToken ? `Token ${authToken}` : '',
    },
  });
  return next(req);
};
