import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterbubblechartComponent } from './transporterbubblechart.component';

describe('TransporterbubblechartComponent', () => {
  let component: TransporterbubblechartComponent;
  let fixture: ComponentFixture<TransporterbubblechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterbubblechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterbubblechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
