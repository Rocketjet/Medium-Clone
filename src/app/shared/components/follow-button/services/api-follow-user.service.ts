import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProfileResponseInterface } from 'src/app/shared/interfaces/profile-response.interface';
import { ProfileInterface } from 'src/app/shared/interfaces/profile.interface';
import { SLUG } from 'src/environments/constants/api-params.const';
import { apiFollowUser } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiFollowUserService {
  private readonly http = inject(HttpClient);

  followUser(username: string): Observable<ProfileInterface> {
    const { API_HOST_URL, FOLLOW_USER } = apiFollowUser;
    const url = `${API_HOST_URL}/${FOLLOW_USER}`.replace(SLUG, username);
    return this.http
      .post<ProfileResponseInterface>(url, {})
      .pipe(map((response) => response.profile));
  }

  unFollowUser(username: string): Observable<ProfileInterface> {
    const { API_HOST_URL, FOLLOW_USER } = apiFollowUser;
    const url = `${API_HOST_URL}/${FOLLOW_USER}`.replace(SLUG, username);
    return this.http
      .delete<ProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }
}
