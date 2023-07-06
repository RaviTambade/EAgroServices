import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantProfileComponent } from './merchant-profile.component';

describe('MerchantProfileComponent', () => {
  let component: MerchantProfileComponent;
  let fixture: ComponentFixture<MerchantProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
