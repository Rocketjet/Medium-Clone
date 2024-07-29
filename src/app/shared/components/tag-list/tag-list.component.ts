import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PopularTagType } from '../../types/popular-tag.type';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TagListComponent {
  @Input() tags!: PopularTagType[];
}
