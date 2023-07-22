import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantShipmentPaymentComponent } from './merchant-shipment-payment.component';

describe('MerchantShipmentPaymentComponent', () => {
  let component: MerchantShipmentPaymentComponent;
  let fixture: ComponentFixture<MerchantShipmentPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantShipmentPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantShipmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
