import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRoutingComponent } from './authentication-routing.component';

describe('AuthenticationRoutingComponent', () => {
  let component: AuthenticationRoutingComponent;
  let fixture: ComponentFixture<AuthenticationRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticationRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
