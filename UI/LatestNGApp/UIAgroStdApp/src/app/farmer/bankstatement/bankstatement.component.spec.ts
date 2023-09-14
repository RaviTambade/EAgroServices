import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankstatementComponent } from './bankstatement.component';

describe('BankstatementComponent', () => {
  let component: BankstatementComponent;
  let fixture: ComponentFixture<BankstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
