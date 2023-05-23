import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateadminComponent } from './updateadmin.component';

describe('UpdateadminComponent', () => {
  let component: UpdateadminComponent;
  let fixture: ComponentFixture<UpdateadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
