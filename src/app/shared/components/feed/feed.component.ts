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
import { environment } from 'src/environments/environment.development';
import { PaginationComponent } from '../pagination/pagination.component';
import { FeedService } from './services/feed.service';
import { GetFeedResponseInterface } from './interfaces/get-feed-response.interface';
import { TagListComponent } from '../tag-list/tag-list.component';
// import { AddToFavouritesComponent } from '../add-to-favouties/add-to-favourites.component';

interface FeedData {
  isLoading: boolean;
  error: string | null;
  feed: GetFeedResponseInterface | null;
}

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
    // AddToFavouritesComponent,
  ],
})
export class FeedComponent implements OnInit {
  @Input() public apiUrl!: string;

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly feedService = inject(FeedService);

  public data$!: Observable<FeedData>;
  baseUrl!: string; // яка стрічка відкрита
  public currentPage!: number; // на які ми сторінці
  public limit!: number; // кількість постів в стрічці

  public ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }));
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
  // public ngOnChanges(changes: SimpleChanges): void {
  //   const isApiUrlChanged =
  //     !changes['apiUrl'].firstChange &&
  //     changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;
  //   if (isApiUrlChanged) {
  //     this.fetchFeed();
  //   }
  // }
  private fetchFeed(): void {
    const url = this.feedService.createUrlWithParams(
      this.apiUrl,
      this.currentPage,
      this.limit
    );
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
