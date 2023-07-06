import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparouterComponent } from './sparouter.component';

describe('SparouterComponent', () => {
  let component: SparouterComponent;
  let fixture: ComponentFixture<SparouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
