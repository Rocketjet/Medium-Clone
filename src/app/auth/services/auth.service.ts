import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../interfaces/register-request.interface';
import { map, Observable } from 'rxjs';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);

  constructor() {}

  register(data: RegisterRequestInterface): Observable<UserInterface> {
    return this.httpClient
      .post<AuthResponseInterface>(environment.apiUrl + '/users', data)
      .pipe(map((res) => res.user));
  }
}
