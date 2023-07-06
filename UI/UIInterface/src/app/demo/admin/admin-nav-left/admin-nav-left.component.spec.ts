import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavLeftComponent } from './admin-nav-left.component';

describe('AdminNavLeftComponent', () => {
  let component: AdminNavLeftComponent;
  let fixture: ComponentFixture<AdminNavLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNavLeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
