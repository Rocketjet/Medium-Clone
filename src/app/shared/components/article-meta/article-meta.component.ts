import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleInterface } from '../../interfaces/article.interface';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class ArticleMetaComponent {
  @Input() article!: ArticleInterface;
}
