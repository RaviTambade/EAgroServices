import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionstatusComponent } from './collectionstatus.component';

describe('CollectionstatusComponent', () => {
  let component: CollectionstatusComponent;
  let fixture: ComponentFixture<CollectionstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
