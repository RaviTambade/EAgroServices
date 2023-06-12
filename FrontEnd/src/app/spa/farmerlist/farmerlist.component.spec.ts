import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerlistComponent } from './farmerlist.component';

describe('FarmerlistComponent', () => {
  let component: FarmerlistComponent;
  let fixture: ComponentFixture<FarmerlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
