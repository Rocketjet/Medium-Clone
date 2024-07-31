import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../interfaces/backend-errors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-error-messages.component.html',
  styleUrl: './validation-error-messages.component.scss',
})
export class ValidationErrorMessagesComponent implements OnInit {
  @Input() errors: BackendErrorsInterface = {};

  errorMessages: string[] = [];
  ngOnInit(): void {
    this.errorMessages = Object.keys(this.errors).map((key) => {
      const messages = this.errors[key].join(' ');
      return `${key} ${messages}`;
    });
  }
}
