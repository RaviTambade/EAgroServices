import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTodaysMerchantSellComponent } from './get-todays-merchant-sell.component';

describe('GetTodaysMerchantSellComponent', () => {
  let component: GetTodaysMerchantSellComponent;
  let fixture: ComponentFixture<GetTodaysMerchantSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTodaysMerchantSellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTodaysMerchantSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
