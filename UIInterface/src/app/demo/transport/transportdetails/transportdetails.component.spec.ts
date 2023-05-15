import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportdetailsComponent } from './transportdetails.component';

describe('TransportdetailsComponent', () => {
  let component: TransportdetailsComponent;
  let fixture: ComponentFixture<TransportdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
