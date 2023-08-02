import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionListFilterComponent } from './collection-list-filter.component';

describe('CollectionListFilterComponent', () => {
  let component: CollectionListFilterComponent;
  let fixture: ComponentFixture<CollectionListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionListFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
