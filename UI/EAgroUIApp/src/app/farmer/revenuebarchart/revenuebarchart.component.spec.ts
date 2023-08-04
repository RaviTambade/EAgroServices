import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuebarchartComponent } from './revenuebarchart.component';

describe('RevenuebarchartComponent', () => {
  let component: RevenuebarchartComponent;
  let fixture: ComponentFixture<RevenuebarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuebarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenuebarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
