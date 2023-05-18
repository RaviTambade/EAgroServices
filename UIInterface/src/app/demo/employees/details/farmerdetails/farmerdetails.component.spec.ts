import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerdetailsComponent } from './farmerdetails.component';

describe('FarmerdetailsComponent', () => {
  let component: FarmerdetailsComponent;
  let fixture: ComponentFixture<FarmerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
