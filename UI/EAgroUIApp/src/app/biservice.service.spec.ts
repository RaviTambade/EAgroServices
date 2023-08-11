import { TestBed } from '@angular/core/testing';

import { BIServiceService } from './biservice.service';

describe('BIServiceService', () => {
  let service: BIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
