import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersdetailsComponent } from './farmersdetails.component';

describe('FarmersdetailsComponent', () => {
  let component: FarmersdetailsComponent;
  let fixture: ComponentFixture<FarmersdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmersdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmersdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
