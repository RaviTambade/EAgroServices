import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportprofileComponent } from './transportprofile.component';

describe('TransportprofileComponent', () => {
  let component: TransportprofileComponent;
  let fixture: ComponentFixture<TransportprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
