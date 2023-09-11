import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvioceComponent } from './invioce.component';

describe('InvioceComponent', () => {
  let component: InvioceComponent;
  let fixture: ComponentFixture<InvioceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvioceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvioceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
