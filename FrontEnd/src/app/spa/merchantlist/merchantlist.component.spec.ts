import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantlistComponent } from './merchantlist.component';

describe('MerchantlistComponent', () => {
  let component: MerchantlistComponent;
  let fixture: ComponentFixture<MerchantlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
