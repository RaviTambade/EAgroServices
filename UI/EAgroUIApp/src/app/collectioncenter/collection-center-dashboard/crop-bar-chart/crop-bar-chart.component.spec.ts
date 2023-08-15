import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropBarChartComponent } from './crop-bar-chart.component';

describe('CropBarChartComponent', () => {
  let component: CropBarChartComponent;
  let fixture: ComponentFixture<CropBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
