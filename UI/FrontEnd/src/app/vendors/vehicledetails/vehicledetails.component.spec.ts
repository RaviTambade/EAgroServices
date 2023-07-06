import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicledetailsComponent } from './vehicledetails.component';

describe('VehicledetailsComponent', () => {
  let component: VehicledetailsComponent;
  let fixture: ComponentFixture<VehicledetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicledetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
