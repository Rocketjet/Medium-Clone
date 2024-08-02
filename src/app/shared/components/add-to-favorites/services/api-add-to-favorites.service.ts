import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleResponseInterface } from 'src/app/shared/interfaces/article-response.interface';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';
import { SLUG } from 'src/environments/constants/api-params.const';
import { apiFavorites } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiAddToFavoritesService {
  private readonly http = inject(HttpClient);

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const { API_HOST_URL, FAVORITES } = apiFavorites;
    const url = `${API_HOST_URL}/${FAVORITES}`.replace(SLUG, slug);
    return this.http
      .post<ArticleResponseInterface>(url, {})
      .pipe(map((response) => response.article));
  }

  removeToFavorites(slug: string): Observable<ArticleInterface> {
    const { API_HOST_URL, FAVORITES } = apiFavorites;
    const url = `${API_HOST_URL}/${FAVORITES}`.replace(SLUG, slug);
    return this.http
      .delete<ArticleResponseInterface>(url)
      .pipe(map((response) => response.article));
  }
}
