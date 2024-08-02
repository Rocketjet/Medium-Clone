import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'
import {followUserActions} from './store/actions'

@Component({
  selector: 'mc-follow-button',
  templateUrl: './follow-button.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FollowButtonComponent {
  @Input() public isFollowed!: boolean
  @Input() public username!: string

  public constructor(private readonly store: Store) {}

  public handleClick(): void {
    this.store.dispatch(
      followUserActions.followUser({
        isFollowed: this.isFollowed,
        username: this.username,
      })
    )
    this.toggleFollow()
  }

  private toggleFollow(): void {
    this.isFollowed = !this.isFollowed
  }
}
