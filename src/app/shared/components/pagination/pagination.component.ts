import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { PaginationService } from './services/pagination.service';
import { UtilsService } from '../../services/utils.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class PaginationComponent implements OnInit {
  @Input() total!: number;
  @Input() limit!: number;
  @Input() currentPage!: number;
  @Input() url!: string;

  private readonly utilsService = inject(UtilsService);
  private readonly paginationService = inject(PaginationService);
  pagesCount!: number;
  pages!: number[];

  ngOnInit(): void {
    this.pagesCount = this.paginationService.setPagesCount(
      this.total,
      this.limit
    );

    this.pages =
      this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : [];
  }
}
