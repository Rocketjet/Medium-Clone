import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetFeedResponseInterface } from '../interfaces/get-feed-response.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import queryString from 'query-string';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private http = inject(HttpClient);

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    return this.http.get<GetFeedResponseInterface>(
      `${environment.apiUrl}` + url
    );
  }
  public createUrlWithParams(
    url: string,
    currentPage: number,
    limit: number
  ): string {
    const offset = currentPage * limit - limit;
    const parsedUrl = queryString.parseUrl(url);
    const stringifiedParams = queryString.stringify({
      limit,
      offset,
      ...parsedUrl.query,
    });

    return `${parsedUrl.url}?${stringifiedParams}`;
  }
}
