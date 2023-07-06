import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantpurchasesComponent } from './merchantpurchases.component';

describe('MerchantpurchasesComponent', () => {
  let component: MerchantpurchasesComponent;
  let fixture: ComponentFixture<MerchantpurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantpurchasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantpurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
