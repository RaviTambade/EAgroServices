import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteppedLineChartComponent } from './stepped-line-chart.component';

describe('SteppedLineChartComponent', () => {
  let component: SteppedLineChartComponent;
  let fixture: ComponentFixture<SteppedLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteppedLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteppedLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
