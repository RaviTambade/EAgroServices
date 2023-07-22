import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetvehicleshipmentitemsComponent } from './getvehicleshipmentitems.component';

describe('GetvehicleshipmentitemsComponent', () => {
  let component: GetvehicleshipmentitemsComponent;
  let fixture: ComponentFixture<GetvehicleshipmentitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetvehicleshipmentitemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetvehicleshipmentitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
