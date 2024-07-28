import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../interfaces/register-request.interface';
import { map, Observable } from 'rxjs';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';
import { environment } from 'src/environments/environment.development';
import { LoginRequestInterface } from '../interfaces/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);

  constructor() {}

  getUser(res: AuthResponseInterface): UserInterface {
    return res.user;
  }

  getCurrentUser(): Observable<UserInterface> {
    return this.httpClient
      .get<AuthResponseInterface>(environment.apiUrl + '/user')
      .pipe(map(this.getUser));
  }

  register(data: RegisterRequestInterface): Observable<UserInterface> {
    return this.httpClient
      .post<AuthResponseInterface>(environment.apiUrl + '/users', data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<UserInterface> {
    return this.httpClient
      .post<AuthResponseInterface>(environment.apiUrl + '/users/login', data)
      .pipe(map(this.getUser));
  }
}
