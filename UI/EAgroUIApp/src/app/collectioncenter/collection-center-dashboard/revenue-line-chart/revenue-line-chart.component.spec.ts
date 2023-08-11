import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueLineChartComponent } from './revenue-line-chart.component';

describe('RevenueLineChartComponent', () => {
  let component: RevenueLineChartComponent;
  let fixture: ComponentFixture<RevenueLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
