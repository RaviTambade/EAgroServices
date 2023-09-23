import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallshipmentsComponent } from './getallshipments.component';

describe('GetallshipmentsComponent', () => {
  let component: GetallshipmentsComponent;
  let fixture: ComponentFixture<GetallshipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetallshipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetallshipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
