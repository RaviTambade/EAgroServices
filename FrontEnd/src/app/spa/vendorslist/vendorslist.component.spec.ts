import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorslistComponent } from './vendorslist.component';

describe('VendorslistComponent', () => {
  let component: VendorslistComponent;
  let fixture: ComponentFixture<VendorslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
