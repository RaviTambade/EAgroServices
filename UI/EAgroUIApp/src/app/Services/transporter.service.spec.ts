import { TestBed } from '@angular/core/testing';

import { TransporterService } from './transporter.service';

describe('TransporterService', () => {
  let service: TransporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
