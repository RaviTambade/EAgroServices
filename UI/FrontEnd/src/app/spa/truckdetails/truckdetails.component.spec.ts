import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckdetailsComponent } from './truckdetails.component';

describe('TruckdetailsComponent', () => {
  let component: TruckdetailsComponent;
  let fixture: ComponentFixture<TruckdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
