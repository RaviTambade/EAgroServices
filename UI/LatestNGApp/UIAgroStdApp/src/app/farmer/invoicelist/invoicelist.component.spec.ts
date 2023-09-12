import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicelistComponent } from './invoicelist.component';

describe('InvoicelistComponent', () => {
  let component: InvoicelistComponent;
  let fixture: ComponentFixture<InvoicelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
