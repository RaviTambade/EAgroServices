import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCorporateComponent } from './register-corporate.component';

describe('RegisterCorporateComponent', () => {
  let component: RegisterCorporateComponent;
  let fixture: ComponentFixture<RegisterCorporateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCorporateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
