import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FarmerServicePayment } from './farmer-service-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  addpayment(farmerServicePayment: FarmerServicePayment): Observable<boolean> {
    let url = "http://localhost:5030/api/payment";
    return this.http.post<boolean>(url, farmerServicePayment);
  }

  isShipmentPaid(shipmentId: number): Observable<boolean> {
    let url = "http://localhost:5030/api/transporter/payments/ispaid/" + shipmentId;
    return this.http.get<boolean>(url);
  }

}
