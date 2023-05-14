import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantUpdateComponent } from './merchant-update.component';

describe('MerchantUpdateComponent', () => {
  let component: MerchantUpdateComponent;
  let fixture: ComponentFixture<MerchantUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
