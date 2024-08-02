import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { ApiAddToFavoritesService } from './services/api-add-to-favorites.service';
import { Store } from '@ngrx/store';
import { addToFavoritesActions } from './store/add-to-fav.actions';

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrl: './add-to-favorites.component.scss',
  standalone: true,
  imports: [CommonModule],
  providers: [ApiAddToFavoritesService],
})
export class AddToFavoritesComponent {
  @Input() isFavorited!: boolean;
  @Input() articleSlug!: string;
  @Input() favoritesCount!: number;
  @ViewChild('likeButton', { static: true }) likeButton!: ElementRef;

  private readonly store = inject(Store);

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    );
    this.setFavoritesCount();
    this.toggleIsFavorited();
    this.likeButton.nativeElement.blur();
  }

  private setFavoritesCount(): void {
    this.isFavorited ? this.favoritesCount-- : this.favoritesCount++;
  }
  private toggleIsFavorited(): void {
    this.isFavorited = !this.isFavorited;
  }
}
