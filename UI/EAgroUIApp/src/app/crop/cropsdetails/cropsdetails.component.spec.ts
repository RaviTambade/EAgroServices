import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropsdetailsComponent } from './cropsdetails.component';

describe('CropsdetailsComponent', () => {
  let component: CropsdetailsComponent;
  let fixture: ComponentFixture<CropsdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropsdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
