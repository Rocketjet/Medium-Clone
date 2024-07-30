import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  //? створюємо масив чисел, де кожен індекс відповідає номеру сторінки 
  range(count: number): number[] {
    return [...Array(count).keys()].map((el) => el + 1);
  }
}
