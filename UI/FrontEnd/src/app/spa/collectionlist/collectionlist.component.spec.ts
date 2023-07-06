import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionlistComponent } from './collectionlist.component';

describe('CollectionlistComponent', () => {
  let component: CollectionlistComponent;
  let fixture: ComponentFixture<CollectionlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
