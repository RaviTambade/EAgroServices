import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPurchaselistComponent } from './merchant-purchaselist.component';

describe('MerchantPurchaselistComponent', () => {
  let component: MerchantPurchaselistComponent;
  let fixture: ComponentFixture<MerchantPurchaselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPurchaselistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPurchaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
