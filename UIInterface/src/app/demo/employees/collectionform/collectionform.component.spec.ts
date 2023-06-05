import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionformComponent } from './collectionform.component';

describe('CollectionformComponent', () => {
  let component: CollectionformComponent;
  let fixture: ComponentFixture<CollectionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
