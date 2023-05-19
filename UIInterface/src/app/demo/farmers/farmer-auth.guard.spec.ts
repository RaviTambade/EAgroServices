import { TestBed } from '@angular/core/testing';

import { FarmerAuthGuard } from './farmer-auth.guard';

describe('FarmerAuthGuard', () => {
  let guard: FarmerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FarmerAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
