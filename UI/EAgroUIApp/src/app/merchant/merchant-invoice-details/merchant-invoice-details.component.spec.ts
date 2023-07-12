import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantInvoiceDetailsComponent } from './merchant-invoice-details.component';

describe('MerchantInvoiceDetailsComponent', () => {
  let component: MerchantInvoiceDetailsComponent;
  let fixture: ComponentFixture<MerchantInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantInvoiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
