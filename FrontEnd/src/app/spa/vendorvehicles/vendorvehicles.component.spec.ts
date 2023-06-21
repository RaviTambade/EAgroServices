import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorvehiclesComponent } from './vendorvehicles.component';

describe('VendorvehiclesComponent', () => {
  let component: VendorvehiclesComponent;
  let fixture: ComponentFixture<VendorvehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorvehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorvehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
