import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerDeleteComponent } from './farmer-delete.component';

describe('FarmerDeleteComponent', () => {
  let component: FarmerDeleteComponent;
  let fixture: ComponentFixture<FarmerDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
