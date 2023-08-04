import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantdoughnutchartComponent } from './merchantdoughnutchart.component';

describe('MerchantdoughnutchartComponent', () => {
  let component: MerchantdoughnutchartComponent;
  let fixture: ComponentFixture<MerchantdoughnutchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantdoughnutchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantdoughnutchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
