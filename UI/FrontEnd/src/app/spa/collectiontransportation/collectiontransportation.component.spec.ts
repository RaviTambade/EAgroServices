import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectiontransportationComponent } from './collectiontransportation.component';

describe('CollectiontransportationComponent', () => {
  let component: CollectiontransportationComponent;
  let fixture: ComponentFixture<CollectiontransportationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectiontransportationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectiontransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
