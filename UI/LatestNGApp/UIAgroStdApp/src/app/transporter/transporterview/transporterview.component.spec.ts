import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterviewComponent } from './transporterview.component';

describe('TransporterviewComponent', () => {
  let component: TransporterviewComponent;
  let fixture: ComponentFixture<TransporterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransporterviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransporterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
