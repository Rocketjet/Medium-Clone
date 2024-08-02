import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { followUserActions } from './store/follow-button.actions';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FollowButtonComponent {
  @Input() isFollowed!: boolean;
  @Input() username!: string;
  @ViewChild('followButton') followButton!: ElementRef;

  private readonly store = inject(Store);

  handleClick(): void {
    this.store.dispatch(
      followUserActions.followUser({
        isFollowed: this.isFollowed,
        username: this.username,
      })
    );
    this.toggleFollow();
    this.followButton.nativeElement.blur();
  }

  private toggleFollow(): void {
    this.isFollowed = !this.isFollowed;
  }
}
