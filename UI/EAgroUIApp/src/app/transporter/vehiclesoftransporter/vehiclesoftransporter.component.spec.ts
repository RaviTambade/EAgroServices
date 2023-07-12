import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesoftransporterComponent } from './vehiclesoftransporter.component';

describe('VehiclesoftransporterComponent', () => {
  let component: VehiclesoftransporterComponent;
  let fixture: ComponentFixture<VehiclesoftransporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesoftransporterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesoftransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
