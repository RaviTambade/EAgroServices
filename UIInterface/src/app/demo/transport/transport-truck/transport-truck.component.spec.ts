import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTruckComponent } from './transport-truck.component';

describe('TransportTruckComponent', () => {
  let component: TransportTruckComponent;
  let fixture: ComponentFixture<TransportTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
