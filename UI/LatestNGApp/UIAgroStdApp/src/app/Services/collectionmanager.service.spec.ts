import { TestBed } from '@angular/core/testing';

import { CollectionmanagerService } from './collectionmanager.service';

describe('CollectionmanagerService', () => {
  let service: CollectionmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
