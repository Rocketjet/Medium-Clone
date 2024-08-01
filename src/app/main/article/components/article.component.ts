import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ArticleService } from '../services/article.service';
import { combineLatest, filter, Observable } from 'rxjs';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { articleActions } from '../store/article.actions';
import {
  selectArticle,
  selectError,
  selectIsLoading,
} from '../store/article.reducer';
import { selectUser } from 'src/app/auth/store/auth.reducer';
import { ArticleDataInterface } from '../interfaces/article-data.interface';
import { CommonModule } from '@angular/common';
import { ArticleMetaComponent } from 'src/app/shared/components/article-meta/article-meta.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ErrorMessageComponent } from 'src/app/shared/components/error-messages/error-message.component';
import { TagListComponent } from 'src/app/shared/components/tag-list/tag-list.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ArticleMetaComponent,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);

  slug!: string;
  data$!: Observable<ArticleDataInterface>;
  isAuthor$!: Observable<boolean>; //? властивість для перевірки того, чи відкритий пост написаний поточним користувачем чи ні
  // user$!: Observable<UserInterface | null>;

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
    this.isAuthor$ = this.articleService.isAuthor();

    // this.user$ = this.store
    //   .select(selectUser)
    //   .pipe(filter((user): user is UserInterface | null => user !== undefined));

    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticle),
      isAuthor: this.isAuthor$,
      // user: this.user$,
    });
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }));
  }
}
