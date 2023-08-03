import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantbarchartComponent } from './merchantbarchart.component';

describe('MerchantbarchartComponent', () => {
  let component: MerchantbarchartComponent;
  let fixture: ComponentFixture<MerchantbarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantbarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantbarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
