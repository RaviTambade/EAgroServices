import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewvehicleComponent } from './addnewvehicle.component';

describe('AddnewvehicleComponent', () => {
  let component: AddnewvehicleComponent;
  let fixture: ComponentFixture<AddnewvehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewvehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
