import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerpiechartComponent } from './farmerpiechart.component';

describe('FarmerpiechartComponent', () => {
  let component: FarmerpiechartComponent;
  let fixture: ComponentFixture<FarmerpiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerpiechartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerpiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
