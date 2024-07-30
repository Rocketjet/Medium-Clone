import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../interfaces/register-request.interface';
import { map, Observable } from 'rxjs';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { AuthResponseInterface } from '../interfaces/auth-response.interface';
import { apiAuth } from 'src/environments/environment.development';
import { LoginRequestInterface } from '../interfaces/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  getCurrentUser(): Observable<UserInterface> {
    const { API_HOST_URL, USER } = apiAuth;
    const url = `${API_HOST_URL}/${USER}`;
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  register(data: RegisterRequestInterface): Observable<UserInterface> {
    const { API_HOST_URL, USERS } = apiAuth;
    const url = `${API_HOST_URL}/${USERS}`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<UserInterface> {
    const { API_HOST_URL, LOGIN } = apiAuth;
    const url = `${API_HOST_URL}/${LOGIN}`;
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  private getUser(res: AuthResponseInterface): UserInterface {
    return res.user;
  }
}
