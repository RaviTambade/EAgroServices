import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerPurchaseFormComponent } from './farmer-purchase-form.component';

describe('FarmerPurchaseFormComponent', () => {
  let component: FarmerPurchaseFormComponent;
  let fixture: ComponentFixture<FarmerPurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerPurchaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
