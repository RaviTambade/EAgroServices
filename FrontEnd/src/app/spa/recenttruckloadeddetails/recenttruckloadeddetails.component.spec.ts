import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecenttruckloadeddetailsComponent } from './recenttruckloadeddetails.component';

describe('RecenttruckloadeddetailsComponent', () => {
  let component: RecenttruckloadeddetailsComponent;
  let fixture: ComponentFixture<RecenttruckloadeddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecenttruckloadeddetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecenttruckloadeddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
