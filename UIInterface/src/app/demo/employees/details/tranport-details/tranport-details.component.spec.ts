import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranportDetailsComponent } from './tranport-details.component';

describe('TranportDetailsComponent', () => {
  let component: TranportDetailsComponent;
  let fixture: ComponentFixture<TranportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranportDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
