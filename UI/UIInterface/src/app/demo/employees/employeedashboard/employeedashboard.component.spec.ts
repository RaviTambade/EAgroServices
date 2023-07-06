import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedashboardComponent } from './employeedashboard.component';

describe('EmployeedashboardComponent', () => {
  let component: EmployeedashboardComponent;
  let fixture: ComponentFixture<EmployeedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeedashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
