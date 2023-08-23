import { TestBed } from '@angular/core/testing';

import { RevenueDateService } from './revenue-date-service.service';

describe('RevenueDateServiceService', () => {
  let service: RevenueDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenueDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
