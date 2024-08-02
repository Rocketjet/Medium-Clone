import { inject, Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { selectUser } from 'src/app/auth/store/auth.reducer';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { selectUserProfile } from '../store/user-profile.reducer';
import { UserProfileInterface } from '../interfaces/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly store = inject(Store);

  isUserProfile(): Observable<boolean> {
    return combineLatest({
      user: this.store.pipe(
        select(selectUser),
        filter((user): user is UserInterface => user !== undefined)
      ),
      userProfile: this.store.pipe(
        select(selectUserProfile),
        filter((userProfile): userProfile is UserProfileInterface =>
          Boolean(userProfile)
        )
      ),
    }).pipe(
      map(({ user, userProfile }) => {
        return user.username === userProfile.username;
      })
    );
  }
}
