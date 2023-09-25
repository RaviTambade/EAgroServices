import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionverificationComponent } from './collectionverification.component';

describe('CollectionverificationComponent', () => {
  let component: CollectionverificationComponent;
  let fixture: ComponentFixture<CollectionverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionverificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
