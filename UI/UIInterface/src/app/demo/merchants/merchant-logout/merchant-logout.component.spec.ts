import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantLogoutComponent } from './merchant-logout.component';

describe('MerchantLogoutComponent', () => {
  let component: MerchantLogoutComponent;
  let fixture: ComponentFixture<MerchantLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
