import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetFeedResponseInterface } from '../interfaces/get-feed-response.interface';
import { Observable } from 'rxjs';
import { apiAuth } from 'src/environments/environment.development';
import queryString from 'query-string';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly http = inject(HttpClient);

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const { API_HOST_URL } = apiAuth;
    const fullUrl = `${API_HOST_URL}/${url}`;
    return this.http.get<GetFeedResponseInterface>(fullUrl);
  }

  createUrlWithParams(url: string, currentPage: number, limit: number): string {
    // формула, за якою ми визначаємо зсув по кількості завантажених постів
    // якщо ми на 2 сторінці і на одній ми показуємо 10 постів, то 2 * 10 - 10 = 10, тобто зсув на 10 постів
    const offset = currentPage * limit - limit;
    // метод parseUrl() розбиває адресу на частини: {url: '/articles', query: {} }
    const parsedUrl = queryString.parseUrl(url);
    // queryString.stringify() - перетворює об'єкт рядок запиту, сортуючи ключі
    const stringifiedParams = queryString.stringify({
      limit,
      offset,
      ...parsedUrl.query,
    }); // limit=10&offset=10

    return `${parsedUrl.url}?${stringifiedParams}`;
  }
}
