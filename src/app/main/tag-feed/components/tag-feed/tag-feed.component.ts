import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feed-toggler/feed-toggler.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { PopularTagsComponent } from 'src/app/shared/components/popular-tags/popular-tags.component';
import { apiFeed } from 'src/environments/environment.development';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  private route = inject(ActivatedRoute);
  apiUrl!: string;
  tagName!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `${apiFeed.ARTICLES}?tag=${this.tagName}`;
    });
  }
}
