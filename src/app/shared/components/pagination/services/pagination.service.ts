import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  //? рахуємо скільки всього сторінок має бути, де total це загальна кількість постів, а limit - кількість постів на сторінці
  public setPagesCount(total: number, limit: number): number {
    return Math.ceil(total / limit);
  }
}
