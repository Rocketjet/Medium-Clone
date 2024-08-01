import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ArticleRequestInterface } from 'src/app/shared/interfaces/article-request.interface';
import { ArticleResponseInterface } from 'src/app/shared/interfaces/article-response.interface';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';
import { apiArticle } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiCreateArticleService {
  private readonly http = inject(HttpClient);

  createArticle(
    request: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const { API_HOST_URL, ARTICLES } = apiArticle;
    const url = `${API_HOST_URL}/${ARTICLES}`;
    return this.http
      .post<ArticleResponseInterface>(url, request)
      .pipe(map((response) => response.article));
  }
}
