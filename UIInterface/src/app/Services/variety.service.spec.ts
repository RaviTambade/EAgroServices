import { TestBed } from '@angular/core/testing';

import { VarietyService } from './variety.service';

describe('VarietyService', () => {
  let service: VarietyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarietyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
