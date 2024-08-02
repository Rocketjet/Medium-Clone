import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable, map} from 'rxjs'
import {ProfileResponse} from 'src/app/shared/types/profile-response.interface'
import {UserProfileInterface} from 'src/app/user-profile/types/user-profile.interface'
import {ApiParams} from 'src/environments/const/api-params.const'
import {apiFavorites} from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class ApiFollowUserService {
  constructor(private http: HttpClient) {}

  public followUser(username: string): Observable<UserProfileInterface> {
    const {API_HOST_URL, FAVORITES} = apiFavorites
    const url = `${API_HOST_URL}/${FAVORITES}`.replace(ApiParams.SLUG, username)
    return this.http
      .post<ProfileResponse>(url, {})
      .pipe(map((response) => response.profile))
  }

  public unfollowUser(username: string): Observable<UserProfileInterface> {
    const {API_HOST_URL, FAVORITES} = apiFavorites
    const url = `${API_HOST_URL}/${FAVORITES}`.replace(ApiParams.SLUG, username)
    return this.http
      .delete<ProfileResponse>(url)
      .pipe(map((response) => response.profile))
  }
}
