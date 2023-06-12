import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorlistComponent } from './vendorlist.component';

describe('VendorlistComponent', () => {
  let component: VendorlistComponent;
  let fixture: ComponentFixture<VendorlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
