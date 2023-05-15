import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportNavLeftComponent } from './transport-nav-left.component';

describe('TransportNavLeftComponent', () => {
  let component: TransportNavLeftComponent;
  let fixture: ComponentFixture<TransportNavLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportNavLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportNavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
