import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodscollectionComponent } from './goodscollection.component';

describe('GoodscollectionComponent', () => {
  let component: GoodscollectionComponent;
  let fixture: ComponentFixture<GoodscollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodscollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodscollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
