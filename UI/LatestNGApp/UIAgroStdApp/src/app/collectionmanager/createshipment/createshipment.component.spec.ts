import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateshipmentComponent } from './createshipment.component';

describe('CreateshipmentComponent', () => {
  let component: CreateshipmentComponent;
  let fixture: ComponentFixture<CreateshipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateshipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateshipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
