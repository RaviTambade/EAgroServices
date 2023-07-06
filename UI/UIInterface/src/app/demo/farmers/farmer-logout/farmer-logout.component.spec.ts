import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerLogoutComponent } from './farmer-logout.component';

describe('FarmerLogoutComponent', () => {
  let component: FarmerLogoutComponent;
  let fixture: ComponentFixture<FarmerLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
