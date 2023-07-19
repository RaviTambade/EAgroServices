import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantRoutingComponent } from './merchant-routing.component';

describe('MerchantRoutingComponent', () => {
  let component: MerchantRoutingComponent;
  let fixture: ComponentFixture<MerchantRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
