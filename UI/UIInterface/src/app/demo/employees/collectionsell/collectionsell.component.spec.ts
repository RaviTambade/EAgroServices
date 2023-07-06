import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsellComponent } from './collectionsell.component';

describe('CollectionsellComponent', () => {
  let component: CollectionsellComponent;
  let fixture: ComponentFixture<CollectionsellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
