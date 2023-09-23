import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedcollectionComponent } from './unverifiedcollection.component';

describe('UnverifiedcollectionComponent', () => {
  let component: UnverifiedcollectionComponent;
  let fixture: ComponentFixture<UnverifiedcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnverifiedcollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnverifiedcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
