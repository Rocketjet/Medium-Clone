import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { userProfileActions } from '../store/user-profile.actions';
import {
  selectError,
  selectIsLoading,
  selectUserProfile,
} from '../store/user-profile.reducer';
import { UserProfileInterface } from '../interfaces/user-profile.interface';
import { FollowButtonComponent } from 'src/app/shared/components/follow-button/follow-button.component';
import { UserProfileService } from '../services/user-profile.service';

interface UserProfileDataInterface {
  isLoading: boolean;
  error: string | null;
  userProfile: UserProfileInterface | null;
  isUserProfile: boolean;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FeedComponent,
    FollowButtonComponent,
  ],
})
export class UserProfileComponent implements OnInit {
  slug!: string;
  data$!: Observable<UserProfileDataInterface>;
  isUserProfile$!: Observable<boolean>;

  public readonly route = inject(ActivatedRoute);
  public readonly router = inject(Router);
  public readonly userProfileService = inject(UserProfileService);
  public readonly store = inject(Store);

  ngOnInit(): void {
    this.isUserProfile$ = this.userProfileService.isUserProfile();

    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      userProfile: this.store.select(selectUserProfile),
      isUserProfile: this.isUserProfile$,
    });

    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }

  private fetchUserProfile(): void {
    this.store.dispatch(userProfileActions.getUserProfile({ slug: this.slug }));
  }
}
