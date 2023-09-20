import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetshipmentofvehicleComponent } from './getshipmentofvehicle.component';

describe('GetshipmentofvehicleComponent', () => {
  let component: GetshipmentofvehicleComponent;
  let fixture: ComponentFixture<GetshipmentofvehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetshipmentofvehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetshipmentofvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
