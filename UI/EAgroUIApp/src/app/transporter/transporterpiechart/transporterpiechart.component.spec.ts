import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterpiechartComponent } from './transporterpiechart.component';

describe('TransporterpiechartComponent', () => {
  let component: TransporterpiechartComponent;
  let fixture: ComponentFixture<TransporterpiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterpiechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterpiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
