import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsortComponent } from './listsort.component';

describe('ListsortComponent', () => {
  let component: ListsortComponent;
  let fixture: ComponentFixture<ListsortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
