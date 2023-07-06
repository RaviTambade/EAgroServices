import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbycropComponent } from './filterbycrop.component';

describe('FilterbycropComponent', () => {
  let component: FilterbycropComponent;
  let fixture: ComponentFixture<FilterbycropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterbycropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterbycropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
