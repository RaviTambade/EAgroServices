import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FarmerServicePayment } from '../Models/farmer-service-payment';
import { TransporterPayment } from '../Models/transporter-payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  addFarmerServicepayment(
    farmerServicePayment: FarmerServicePayment
  ): Observable<boolean> {
    let url = 'http://localhost:5030/api/payment';
    return this.http.post<boolean>(url, farmerServicePayment);
  }

  isShipmentPaid(shipmentId: number): Observable<boolean> {
    let url =
      'http://localhost:5030/api/transporter/payments/ispaid/' + shipmentId;
    return this.http.get<boolean>(url);
  }

  addTransporterPayment(
    transporterPayment: TransporterPayment
  ): Observable<boolean> {
    let url = 'http://localhost:5030/api/transporter/payments';
    return this.http.post<boolean>(url, transporterPayment);
  }
}
