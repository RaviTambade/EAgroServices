import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterbycontainerComponent } from './filterbycontainer.component';

describe('FilterbycontainerComponent', () => {
  let component: FilterbycontainerComponent;
  let fixture: ComponentFixture<FilterbycontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterbycontainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterbycontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
