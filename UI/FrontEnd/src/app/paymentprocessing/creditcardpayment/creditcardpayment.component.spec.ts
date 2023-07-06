import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditcardpaymentComponent } from './creditcardpayment.component';

describe('CreditcardpaymentComponent', () => {
  let component: CreditcardpaymentComponent;
  let fixture: ComponentFixture<CreditcardpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditcardpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditcardpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
