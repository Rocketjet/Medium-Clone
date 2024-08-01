import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../interfaces/register-request.interface';
import { map, Observable } from 'rxjs';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';
import { apiAuth } from 'src/environments/environment.development';
import { LoginRequestInterface } from '../interfaces/login-request.interface';
import { UserRequestInterface } from 'src/app/shared/interfaces/user-request.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private readonly http = inject(HttpClient);

  getUser(): Observable<UserInterface> {
    const { API_HOST_URL, USER } = apiAuth;
    const url = `${API_HOST_URL}/${USER}`;
    return this.http
      .get<AuthResponseInterface>(url)
      .pipe(map(this.getUserFromRes));
  }

  updateUser(user: UserRequestInterface): Observable<UserInterface> {
    const { API_HOST_URL, USER } = apiAuth;
    const url = `${API_HOST_URL}/${USER}`;
    return this.http
      .put<UserRequestInterface>(url, user)
      .pipe(map(this.getUserFromRes));
  }

  register(data: RegisterRequestInterface): Observable<UserInterface> {
    const { API_HOST_URL, USERS } = apiAuth;
    const url = `${API_HOST_URL}/${USERS}`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUserFromRes));
  }

  login(data: LoginRequestInterface): Observable<UserInterface> {
    const { API_HOST_URL, LOGIN } = apiAuth;
    const url = `${API_HOST_URL}/${LOGIN}`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUserFromRes));
  }

  private getUserFromRes(res: AuthResponseInterface): UserInterface {
    return res.user;
  }
}
