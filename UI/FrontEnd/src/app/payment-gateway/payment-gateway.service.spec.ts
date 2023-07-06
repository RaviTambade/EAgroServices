import { TestBed } from '@angular/core/testing';

import { PaymentGatewayService } from './payment-gateway.service';

describe('PaymentGatewayService', () => {
  let service: PaymentGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
