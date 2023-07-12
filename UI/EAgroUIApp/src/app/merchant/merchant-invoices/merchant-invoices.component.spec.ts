import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantInvoicesComponent } from './merchant-invoices.component';

describe('MerchantInvoicesComponent', () => {
  let component: MerchantInvoicesComponent;
  let fixture: ComponentFixture<MerchantInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantInvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
