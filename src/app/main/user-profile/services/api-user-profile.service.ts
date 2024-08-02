import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserProfileInterface } from '../interfaces/user-profile.interface';
import { apiUserProfile } from 'src/environments/environment.development';
import { SLUG } from 'src/environments/constants/api-params.const';
import { UserProfileResponseInterface } from '../interfaces/user-profile-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiUserProfileService {
  private readonly http = inject(HttpClient);

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const { API_HOST_URL, USER_PROFILE } = apiUserProfile;
    const url = `${API_HOST_URL}/${USER_PROFILE}`.replace(
      SLUG,
      slug.toString()
    );
    return this.http
      .get<UserProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }
}
