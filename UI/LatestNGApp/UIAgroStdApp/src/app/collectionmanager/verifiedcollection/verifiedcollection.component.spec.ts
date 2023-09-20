import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedcollectionComponent } from './verifiedcollection.component';

describe('VerifiedcollectionComponent', () => {
  let component: VerifiedcollectionComponent;
  let fixture: ComponentFixture<VerifiedcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiedcollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
