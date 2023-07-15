import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetshipmentsofvehicleComponent } from './getshipmentsofvehicle.component';

describe('GetshipmentsofvehicleComponent', () => {
  let component: GetshipmentsofvehicleComponent;
  let fixture: ComponentFixture<GetshipmentsofvehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetshipmentsofvehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetshipmentsofvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
