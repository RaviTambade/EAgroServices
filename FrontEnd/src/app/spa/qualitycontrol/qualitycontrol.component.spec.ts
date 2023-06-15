import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitycontrolComponent } from './qualitycontrol.component';

describe('QualitycontrolComponent', () => {
  let component: QualitycontrolComponent;
  let fixture: ComponentFixture<QualitycontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualitycontrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitycontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
