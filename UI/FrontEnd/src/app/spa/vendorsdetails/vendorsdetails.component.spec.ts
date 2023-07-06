import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsdetailsComponent } from './vendorsdetails.component';

describe('VendorsdetailsComponent', () => {
  let component: VendorsdetailsComponent;
  let fixture: ComponentFixture<VendorsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
