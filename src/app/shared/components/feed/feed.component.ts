import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/feed.actions';
import { combineLatest, Observable } from 'rxjs';
import { selectError, selectFeed, selectIsLoading } from './store/feed.reducer';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessageComponent } from '../error-messages/error-message.component';
import { LoadingComponent } from '../loading/loading.component';
import { environment } from 'src/environments/_common_environment';
import { PaginationComponent } from '../pagination/pagination.component';
import { FeedService } from './services/feed.service';
import { TagListComponent } from '../tag-list/tag-list.component';
import { FeedStateInterface } from './interfaces/feed-state.interface';
import { AddToFavoritesComponent } from '../add-to-favorites/add-to-favorites.component';
import { selectUser } from 'src/app/auth/store/auth.reducer';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddToFavoritesComponent
  ],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl!: string;

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly feedService = inject(FeedService);

  data$!: Observable<FeedStateInterface>;
  baseUrl!: string; // яка стрічка відкрита
  currentPage!: number; // на які ми сторінці
  limit!: number; // максимальна кількість постів в стрічці
  user$ = this.store.select(selectUser);

  ngOnInit(): void {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeed),
    });
    this.limit = environment.limit;
    this.baseUrl = this.getBaseFromUrl();
    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = this.getPageForPagination(params);
      //? ця підписка спрацює навіть при першому завантаженні сторінки
      this.fetchFeed();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //? якщо це не перша зміна apiUrl і поточне значення відрізняється від попереднього, значить apiUrl було змінено, а отже потрібно зробити повторний запит за новими постами
    //? це потрібно для tag-feed при виборі різних тегів
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  private fetchFeed(): void {
    const url = this.feedService.createUrlWithParams(
      this.apiUrl,
      this.currentPage,
      this.limit
    ); /// articles?limit=10&offset=10 для 2-ї сторінки
    this.store.dispatch(feedActions.getFeed({ url }));
  }
  private getBaseFromUrl(): string {
    //? це потрібно для того, щоб розуміти яка саме стрічка зараз відкрита, так як їх є декілька, а пагінація одна на всіх
    return this.router.url.split('?')[0];
  }

  private getPageForPagination(params: Params): number {
    return Number(params['page'] || '1');
  }
}
