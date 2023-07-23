import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionverificationDetailsComponent } from './collectionverification-details.component';

describe('CollectionverificationDetailsComponent', () => {
  let component: CollectionverificationDetailsComponent;
  let fixture: ComponentFixture<CollectionverificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionverificationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionverificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
