import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ArticleFormValuesInterface } from '../interfaces/article-form-values.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResponseErrorMessagesComponent } from '../../response-error-messages/response-error-messages.component';
import { ResponseErrorInterface } from 'src/app/shared/interfaces/response-errors.interface';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  standalone: true,
  imports: [CommonModule, ResponseErrorMessagesComponent, ReactiveFormsModule],
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues!: ArticleFormValuesInterface;
  @Input() isSubmitting!: boolean;
  @Input() errors!: ResponseErrorInterface | null;

  @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs are not provided');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValue = this.form.getRawValue();
    const articleFormValues: ArticleFormValuesInterface = {
      ...formValue,
      tagList: formValue.tagList.split(' '),
    };
    this.articleSubmit.emit(articleFormValues);
  }
}
