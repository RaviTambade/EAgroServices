import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterbankingComponent } from './transporterbanking.component';

describe('TransporterbankingComponent', () => {
  let component: TransporterbankingComponent;
  let fixture: ComponentFixture<TransporterbankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterbankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterbankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
