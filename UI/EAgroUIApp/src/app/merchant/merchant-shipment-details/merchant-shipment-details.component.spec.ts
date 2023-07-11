import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantShipmentDetailsComponent } from './merchant-shipment-details.component';

describe('MerchantShipmentDetailsComponent', () => {
  let component: MerchantShipmentDetailsComponent;
  let fixture: ComponentFixture<MerchantShipmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantShipmentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantShipmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
