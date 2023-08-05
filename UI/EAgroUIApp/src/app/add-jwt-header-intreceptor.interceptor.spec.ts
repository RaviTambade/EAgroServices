import { TestBed } from '@angular/core/testing';

import { AddJwtHeaderIntreceptorInterceptor } from './add-jwt-header-intreceptor.interceptor';

describe('AddJwtHeaderIntreceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddJwtHeaderIntreceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddJwtHeaderIntreceptorInterceptor = TestBed.inject(AddJwtHeaderIntreceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
