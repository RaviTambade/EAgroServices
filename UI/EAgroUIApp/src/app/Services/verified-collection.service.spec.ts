import { TestBed } from '@angular/core/testing';

import { VerifiedCollectionService } from './verified-collection.service';

describe('VerifiedCollectionService', () => {
  let service: VerifiedCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifiedCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
