import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSelllistComponent } from './farmer-selllist.component';

describe('FarmerSelllistComponent', () => {
  let component: FarmerSelllistComponent;
  let fixture: ComponentFixture<FarmerSelllistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerSelllistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerSelllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
