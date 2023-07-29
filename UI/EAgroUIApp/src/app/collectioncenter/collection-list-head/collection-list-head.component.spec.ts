import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionListHeadComponent } from './collection-list-head.component';

describe('CollectionListHeadComponent', () => {
  let component: CollectionListHeadComponent;
  let fixture: ComponentFixture<CollectionListHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionListHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionListHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
