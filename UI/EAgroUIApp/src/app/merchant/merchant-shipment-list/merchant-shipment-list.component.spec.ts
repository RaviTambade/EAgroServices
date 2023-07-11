import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantShipmentListComponent } from './merchant-shipment-list.component';

describe('MerchantShipmentListComponent', () => {
  let component: MerchantShipmentListComponent;
  let fixture: ComponentFixture<MerchantShipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantShipmentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantShipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
