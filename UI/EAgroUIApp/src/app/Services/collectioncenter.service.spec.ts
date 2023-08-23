import { TestBed } from '@angular/core/testing';

import { CollectioncenterService } from './collectioncenter.service';

describe('CollectioncenterService', () => {
  let service: CollectioncenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectioncenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
