import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersListComponent } from './farmers-list.component';

describe('FarmersListComponent', () => {
  let component: FarmersListComponent;
  let fixture: ComponentFixture<FarmersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
