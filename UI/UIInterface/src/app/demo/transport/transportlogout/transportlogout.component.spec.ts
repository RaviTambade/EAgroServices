import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportlogoutComponent } from './transportlogout.component';

describe('TransportlogoutComponent', () => {
  let component: TransportlogoutComponent;
  let fixture: ComponentFixture<TransportlogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportlogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportlogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
