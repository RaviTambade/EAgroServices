import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportupdateComponent } from './transportupdate.component';

describe('TransportupdateComponent', () => {
  let component: TransportupdateComponent;
  let fixture: ComponentFixture<TransportupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
