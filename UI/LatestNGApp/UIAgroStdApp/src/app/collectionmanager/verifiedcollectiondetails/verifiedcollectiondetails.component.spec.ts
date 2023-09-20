import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedcollectiondetailsComponent } from './verifiedcollectiondetails.component';

describe('VerifiedcollectiondetailsComponent', () => {
  let component: VerifiedcollectiondetailsComponent;
  let fixture: ComponentFixture<VerifiedcollectiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedcollectiondetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedcollectiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
