import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportdashboardComponent } from './transportdashboard.component';

describe('TransportdashboardComponent', () => {
  let component: TransportdashboardComponent;
  let fixture: ComponentFixture<TransportdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
