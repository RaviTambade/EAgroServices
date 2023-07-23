import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollectionComponent } from './update-collection.component';

describe('UpdateCollectionComponent', () => {
  let component: UpdateCollectionComponent;
  let fixture: ComponentFixture<UpdateCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
