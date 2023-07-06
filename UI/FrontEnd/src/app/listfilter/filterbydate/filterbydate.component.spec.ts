import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbydateComponent } from './filterbydate.component';

describe('FilterbydateComponent', () => {
  let component: FilterbydateComponent;
  let fixture: ComponentFixture<FilterbydateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterbydateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterbydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
