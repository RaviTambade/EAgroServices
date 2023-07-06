import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnchartComponent } from './columnchart.component';

describe('ColumnchartComponent', () => {
  let component: ColumnchartComponent;
  let fixture: ComponentFixture<ColumnchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
