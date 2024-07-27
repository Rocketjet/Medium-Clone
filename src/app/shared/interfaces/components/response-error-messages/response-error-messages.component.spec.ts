import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseErrorMessagesComponent } from './response-error-messages.component';

describe('ResponseErrorMessagesComponent', () => {
  let component: ResponseErrorMessagesComponent;
  let fixture: ComponentFixture<ResponseErrorMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseErrorMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
