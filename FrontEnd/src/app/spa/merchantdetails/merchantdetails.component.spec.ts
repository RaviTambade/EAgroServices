import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantdetailsComponent } from './merchantdetails.component';

describe('MerchantdetailsComponent', () => {
  let component: MerchantdetailsComponent;
  let fixture: ComponentFixture<MerchantdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
