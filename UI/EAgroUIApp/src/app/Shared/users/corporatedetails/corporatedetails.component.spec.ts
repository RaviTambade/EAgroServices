import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatedetailsComponent } from './corporatedetails.component';

describe('CorporatedetailsComponent', () => {
  let component: CorporatedetailsComponent;
  let fixture: ComponentFixture<CorporatedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporatedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
