import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { apiArticle } from 'src/environments/environment.development';
import { ArticleResponseInterface } from '../interfaces/article-response.interface';
import { ArticleInterface } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiArticleService {
  private readonly http = inject(HttpClient);

  getArticle(slug: string): Observable<ArticleInterface> {
    const { API_HOST_URL, ARTICLES } = apiArticle;
    const url = `${API_HOST_URL}/${ARTICLES}/${slug}`;
    return this.http
      .get<ArticleResponseInterface>(url)
      .pipe(map((response: ArticleResponseInterface) => response.article));
  }

  deleteArticle(slug: string): Observable<{}> {
    const { API_HOST_URL, ARTICLES } = apiArticle;
    const url = `${API_HOST_URL}/${ARTICLES}/${slug}`;
    return this.http.delete(url);
  }
}
