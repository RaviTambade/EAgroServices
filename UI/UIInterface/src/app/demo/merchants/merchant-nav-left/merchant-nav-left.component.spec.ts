import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantNavLeftComponent } from './merchant-nav-left.component';

describe('MerchantNavLeftComponent', () => {
  let component: MerchantNavLeftComponent;
  let fixture: ComponentFixture<MerchantNavLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantNavLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantNavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
