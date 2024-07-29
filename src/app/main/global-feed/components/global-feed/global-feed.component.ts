import { Component } from '@angular/core';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
  templateUrl: './global-feed.component.html',
  styleUrl: './global-feed.component.scss',
})
export class GlobalFeedComponent {
  apiUrl = '/articles?limit=10';
}
