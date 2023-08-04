import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPaymentListComponent } from './collection-payment-list.component';

describe('CollectionPaymentListComponent', () => {
  let component: CollectionPaymentListComponent;
  let fixture: ComponentFixture<CollectionPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionPaymentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
