import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerbankingComponent } from './farmerbanking.component';

describe('FarmerbankingComponent', () => {
  let component: FarmerbankingComponent;
  let fixture: ComponentFixture<FarmerbankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerbankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerbankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
