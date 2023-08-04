import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPaymentListBodyComponent } from './collection-payment-list-body.component';

describe('CollectionPaymentListBodyComponent', () => {
  let component: CollectionPaymentListBodyComponent;
  let fixture: ComponentFixture<CollectionPaymentListBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionPaymentListBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionPaymentListBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
