import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantpurchasedetailsComponent } from './merchantpurchasedetails.component';

describe('MerchantpurchasedetailsComponent', () => {
  let component: MerchantpurchasedetailsComponent;
  let fixture: ComponentFixture<MerchantpurchasedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantpurchasedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantpurchasedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
