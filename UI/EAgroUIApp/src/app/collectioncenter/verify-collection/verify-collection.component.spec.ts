import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCollectionComponent } from './verify-collection.component';

describe('VerifyCollectionComponent', () => {
  let component: VerifyCollectionComponent;
  let fixture: ComponentFixture<VerifyCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
