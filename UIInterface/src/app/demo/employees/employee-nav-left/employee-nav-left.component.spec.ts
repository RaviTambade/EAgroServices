import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNavLeftComponent } from './employee-nav-left.component';

describe('EmployeeNavLeftComponent', () => {
  let component: EmployeeNavLeftComponent;
  let fixture: ComponentFixture<EmployeeNavLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeNavLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeNavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
