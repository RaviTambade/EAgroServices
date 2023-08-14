import { TestBed } from '@angular/core/testing';

import { ShowButtonServiceService } from './show-button-service.service';

describe('ShowButtonServiceService', () => {
  let service: ShowButtonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowButtonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
