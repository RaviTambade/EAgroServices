import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterdashboardComponent } from './transporterdashboard.component';

describe('TransporterdashboardComponent', () => {
  let component: TransporterdashboardComponent;
  let fixture: ComponentFixture<TransporterdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
