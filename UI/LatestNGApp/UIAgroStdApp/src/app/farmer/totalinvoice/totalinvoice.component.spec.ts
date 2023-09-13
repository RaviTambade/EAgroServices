import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalinvoiceComponent } from './totalinvoice.component';

describe('TotalinvoiceComponent', () => {
  let component: TotalinvoiceComponent;
  let fixture: ComponentFixture<TotalinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalinvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
