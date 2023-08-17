import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerdashboardComponent } from './farmerdashboard.component';

describe('FarmerdashboardComponent', () => {
  let component: FarmerdashboardComponent;
  let fixture: ComponentFixture<FarmerdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
