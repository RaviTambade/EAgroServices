import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedetailsComponent } from './invoicedetails.component';

describe('InvoicedetailsComponent', () => {
  let component: InvoicedetailsComponent;
  let fixture: ComponentFixture<InvoicedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
