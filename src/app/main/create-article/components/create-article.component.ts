import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { CreateArticleStateInterface } from '../interfaces/create-article-state.interface';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../store/create-article.reducer';
import { createArticleActions } from '../store/create-article.actions';
import { CommonModule } from '@angular/common';
import { ArticleFormValuesInterface } from 'src/app/shared/components/article-form/interfaces/article-form-values.interface';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/components/article-form.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent],
})
export class CreateArticleComponent implements OnInit {
  private readonly store = inject(Store);
  initialArticleFormValues!: ArticleFormValuesInterface;
  data$!: Observable<CreateArticleStateInterface>;

  ngOnInit(): void {
    this.initialArticleFormValues = {
      title: '',
      description: '',
      body: '',
      tagList: [],
    };

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors),
    });
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request = {
      article: articleFormValues,
    };
    this.store.dispatch(createArticleActions.createArticle({ request }));
  }
}
