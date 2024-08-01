import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectArticle } from '../store/article.reducer';
import { selectUser } from 'src/app/auth/store/auth.reducer';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private store = inject(Store);

  isAuthor(): Observable<boolean> {
    return combineLatest({
      article: this.store.select(selectArticle),
      user: this.store
        .select(selectUser)
        .pipe(
          filter(
          //? відфільтровуємо значення undefined, бо undefined означає, що ми ще не робити запит на отримання інфи про юзера
            (user): user is UserInterface | null =>
              user !== undefined
          )
        ),
    }).pipe(
      map(({ article, user }) => {
        if (!article || !user) {
          return false;
        }
        return article.author.username === user.username;
      })
    );
  }
}
