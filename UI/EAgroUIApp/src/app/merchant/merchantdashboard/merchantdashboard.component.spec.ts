import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantdashboardComponent } from './merchantdashboard.component';

describe('MerchantdashboardComponent', () => {
  let component: MerchantdashboardComponent;
  let fixture: ComponentFixture<MerchantdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
