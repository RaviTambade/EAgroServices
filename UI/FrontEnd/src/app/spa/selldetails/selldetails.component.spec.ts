import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelldetailsComponent } from './selldetails.component';

describe('SelldetailsComponent', () => {
  let component: SelldetailsComponent;
  let fixture: ComponentFixture<SelldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelldetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
