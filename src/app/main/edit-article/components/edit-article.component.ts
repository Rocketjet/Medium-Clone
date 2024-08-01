import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ArticleFormComponent } from 'src/app/shared/components/article-form/components/article-form.component';
import { ArticleFormValuesInterface } from 'src/app/shared/components/article-form/interfaces/article-form-values.interface';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ArticleInterface } from 'src/app/shared/interfaces/article.interface';

import { editArticleActions } from '../store/edit-article.actions';
import {
  selectArticle,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../store/edit-article.reducer';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';

interface EditArticleData {
  isSubmitting: boolean;
  isLoading: boolean;
  validationErrors: ResponseErrorInterface | null;
  initialArticleFormValues: ArticleFormValuesInterface;
}

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  standalone: true,
  imports: [CommonModule, ArticleFormComponent, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  initialArticleFormValues$!: Observable<ArticleFormValuesInterface>;
  data$!: Observable<EditArticleData>;

  private slug!: string;

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.initialArticleFormValues$ = this.store.pipe(
      select(selectArticle),
      filter((article): article is ArticleInterface => article !== null),
      map(({ title, description, body, tagList }: ArticleInterface) => ({
        title,
        description,
        body,
        tagList,
      }))
    );

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors),
      isLoading: this.store.select(selectIsLoading),
      initialArticleFormValues: this.initialArticleFormValues$,
    });

    this.store.dispatch(editArticleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request = {
      article: articleFormValues,
    };
    this.store.dispatch(
      editArticleActions.editArticle({ request, slug: this.slug })
    );
  }
}
