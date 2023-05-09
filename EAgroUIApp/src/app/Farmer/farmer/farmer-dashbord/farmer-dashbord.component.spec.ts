import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDashbordComponent } from './farmer-dashbord.component';

describe('FarmerDashbordComponent', () => {
  let component: FarmerDashbordComponent;
  let fixture: ComponentFixture<FarmerDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerDashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
