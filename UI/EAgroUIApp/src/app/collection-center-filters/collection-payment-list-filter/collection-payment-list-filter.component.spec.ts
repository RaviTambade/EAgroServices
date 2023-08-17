import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPaymentListFilterComponent } from './collection-payment-list-filter.component';

describe('CollectionPaymentListFilterComponent', () => {
  let component: CollectionPaymentListFilterComponent;
  let fixture: ComponentFixture<CollectionPaymentListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionPaymentListFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionPaymentListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
