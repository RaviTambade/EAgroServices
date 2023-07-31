import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterbarchartComponent } from './transporterbarchart.component';

describe('TransporterbarchartComponent', () => {
  let component: TransporterbarchartComponent;
  let fixture: ComponentFixture<TransporterbarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterbarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
