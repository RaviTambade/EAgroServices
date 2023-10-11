import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentlistComponent } from './shipmentlist.component';

describe('ShipmentlistComponent', () => {
  let component: ShipmentlistComponent;
  let fixture: ComponentFixture<ShipmentlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
