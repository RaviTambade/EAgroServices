import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterlinechartComponent } from './transporterlinechart.component';

describe('TransporterlinechartComponent', () => {
  let component: TransporterlinechartComponent;
  let fixture: ComponentFixture<TransporterlinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterlinechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterlinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
