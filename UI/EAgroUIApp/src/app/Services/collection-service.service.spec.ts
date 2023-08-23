import { TestBed } from '@angular/core/testing';

import { CollectionServiceService } from './collection-service.service';

describe('CollectionServiceService', () => {
  let service: CollectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
