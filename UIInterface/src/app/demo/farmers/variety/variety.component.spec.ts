import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyComponent } from './variety.component';

describe('VarietyComponent', () => {
  let component: VarietyComponent;
  let fixture: ComponentFixture<VarietyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarietyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
