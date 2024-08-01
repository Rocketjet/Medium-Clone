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
export class ApiEditArticleService {
  private readonly http = inject(HttpClient);

  editArticle(
    request: ArticleRequestInterface,
    slug: string
  ): Observable<ArticleInterface> {
    const { API_HOST_URL, ARTICLES } = apiArticle;
    const url = `${API_HOST_URL}/${ARTICLES}/${slug}`;
    return this.http
      .put<ArticleResponseInterface>(url, request)
      .pipe(map((response) => response.article));
  }
}
