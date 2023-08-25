import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterinvoicesComponent } from './transporterinvoices.component';

describe('TransporterinvoicesComponent', () => {
  let component: TransporterinvoicesComponent;
  let fixture: ComponentFixture<TransporterinvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterinvoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterinvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
