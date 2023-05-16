import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsListComponent } from './merchants-list.component';

describe('MerchantsListComponent', () => {
  let component: MerchantsListComponent;
  let fixture: ComponentFixture<MerchantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
