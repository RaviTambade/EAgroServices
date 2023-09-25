import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPaymentDetailsComponent } from './collection-payment-details.component';

describe('CollectionPaymentDetailsComponent', () => {
  let component: CollectionPaymentDetailsComponent;
  let fixture: ComponentFixture<CollectionPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
