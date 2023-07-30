import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionShipmentListComponent } from './collection-shipment-list.component';

describe('CollectionShipmentListComponent', () => {
  let component: CollectionShipmentListComponent;
  let fixture: ComponentFixture<CollectionShipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionShipmentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionShipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
