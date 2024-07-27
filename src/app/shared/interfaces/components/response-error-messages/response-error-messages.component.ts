import { Component, Input, OnInit } from '@angular/core';
import { ResponseErrorInterface } from '../../response-errors.interface';
import { OnIdentifyEffects } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-error-messages.component.html',
  styleUrl: './response-error-messages.component.scss',
})
export class ResponseErrorMessagesComponent implements OnInit {
  @Input() errors: ResponseErrorInterface = {};

  errorMessages: string[] = [];
  ngOnInit(): void {
    this.errorMessages = Object.keys(this.errors).map((key) => {
      const messages = this.errors[key].join(' ');
      return `${key} ${messages}`;
    });
  }
}
