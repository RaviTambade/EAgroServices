import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmercollectiondetailsComponent } from './farmercollectiondetails.component';

describe('FarmercollectiondetailsComponent', () => {
  let component: FarmercollectiondetailsComponent;
  let fixture: ComponentFixture<FarmercollectiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmercollectiondetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmercollectiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
