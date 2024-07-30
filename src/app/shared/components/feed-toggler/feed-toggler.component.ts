import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserInterface } from '../../interfaces/user.interface';
import { selectUser } from 'src/app/auth/store/auth.reducer';

@Component({
  selector: 'app-feed-toggler',
  templateUrl: './feed-toggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent implements OnInit {
  @Input() tagName?: string;

  store = inject(Store);
  user$!: Observable<UserInterface | null | undefined>;

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }
}
