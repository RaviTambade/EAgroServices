import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionVerificationComponent } from './collection-verification.component';

describe('CollectionVerificationComponent', () => {
  let component: CollectionVerificationComponent;
  let fixture: ComponentFixture<CollectionVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
