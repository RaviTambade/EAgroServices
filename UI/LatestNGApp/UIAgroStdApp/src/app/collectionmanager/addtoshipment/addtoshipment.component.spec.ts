import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtoshipmentComponent } from './addtoshipment.component';

describe('AddtoshipmentComponent', () => {
  let component: AddtoshipmentComponent;
  let fixture: ComponentFixture<AddtoshipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtoshipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtoshipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
