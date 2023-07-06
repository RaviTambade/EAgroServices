import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerbillingComponent } from './farmerbilling.component';

describe('FarmerbillingComponent', () => {
  let component: FarmerbillingComponent;
  let fixture: ComponentFixture<FarmerbillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerbillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerbillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
