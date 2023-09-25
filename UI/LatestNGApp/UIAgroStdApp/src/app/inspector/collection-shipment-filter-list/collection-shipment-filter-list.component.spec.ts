import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionShipmentFilterListComponent } from './collection-shipment-filter-list.component';

describe('CollectionShipmentFilterListComponent', () => {
  let component: CollectionShipmentFilterListComponent;
  let fixture: ComponentFixture<CollectionShipmentFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionShipmentFilterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionShipmentFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
