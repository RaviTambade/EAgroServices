import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeifiedCollectionListFilterComponent } from './veified-collection-list-filter.component';

describe('VeifiedCollectionListFilterComponent', () => {
  let component: VeifiedCollectionListFilterComponent;
  let fixture: ComponentFixture<VeifiedCollectionListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeifiedCollectionListFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeifiedCollectionListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
