import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcollectionComponent } from './addnewcollection.component';

describe('AddnewcollectionComponent', () => {
  let component: AddnewcollectionComponent;
  let fixture: ComponentFixture<AddnewcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewcollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
