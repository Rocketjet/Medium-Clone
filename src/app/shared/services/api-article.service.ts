// import {HttpClient} from '@angular/common/http'
// import {Injectable} from '@angular/core'
// import {Observable, map} from 'rxjs'
// import {apiArticle} from 'src/environments/environment.development'
// import {ArticleResponse} from '../types/article-response.interface'
// import {ArticleInterface} from '../types/article.interface'

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiArticleService {
//   public constructor(private readonly http: HttpClient) {}

//   public getArticle(slug: string): Observable<ArticleInterface> {
//     const {API_HOST_URL, ARTICLES} = apiArticle
//     const url = `${API_HOST_URL}/${ARTICLES}/${slug}`
//     return this.http
//       .get<ArticleResponse>(url)
//       .pipe(map((response: ArticleResponse) => response.article))
//   }

//   public deleteArticle(slug: string): Observable<{}> {
//     const {API_HOST_URL, ARTICLES} = apiArticle
//     const url = `${API_HOST_URL}/${ARTICLES}/${slug}`
//     return this.http.delete(url)
//   }
// }
