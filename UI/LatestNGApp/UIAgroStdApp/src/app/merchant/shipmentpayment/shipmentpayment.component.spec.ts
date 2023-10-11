import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentpaymentComponent } from './shipmentpayment.component';

describe('ShipmentpaymentComponent', () => {
  let component: ShipmentpaymentComponent;
  let fixture: ComponentFixture<ShipmentpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
