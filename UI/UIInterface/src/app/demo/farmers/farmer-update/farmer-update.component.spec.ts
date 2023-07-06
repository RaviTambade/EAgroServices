import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerUpdateComponent } from './farmer-update.component';

describe('FarmerUpdateComponent', () => {
  let component: FarmerUpdateComponent;
  let fixture: ComponentFixture<FarmerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
