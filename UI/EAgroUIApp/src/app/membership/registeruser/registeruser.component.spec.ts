import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteruserComponent } from './registeruser.component';

describe('RegisteruserComponent', () => {
  let component: RegisteruserComponent;
  let fixture: ComponentFixture<RegisteruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteruserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
