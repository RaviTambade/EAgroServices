import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerNavLeftComponent } from './farmer-nav-left.component';

describe('FarmerNavLeftComponent', () => {
  let component: FarmerNavLeftComponent;
  let fixture: ComponentFixture<FarmerNavLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerNavLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerNavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
