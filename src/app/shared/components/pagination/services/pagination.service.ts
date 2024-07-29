import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  public setPagesCount(total: number, limit: number): number {
    return Math.ceil(total / limit);
  }
}
