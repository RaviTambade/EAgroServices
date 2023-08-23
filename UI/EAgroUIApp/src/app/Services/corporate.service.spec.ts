import { TestBed } from '@angular/core/testing';

import { CorporateService } from './corporate.service';

describe('CorporateService', () => {
  let service: CorporateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
