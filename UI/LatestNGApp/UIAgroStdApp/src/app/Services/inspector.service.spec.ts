import { TestBed } from '@angular/core/testing';

import { InspectorService } from './inspector.service';

describe('InspectorService', () => {
  let service: InspectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
