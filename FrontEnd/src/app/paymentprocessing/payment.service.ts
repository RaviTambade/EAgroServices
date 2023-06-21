import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cardpayment } from './cardpayment';
import { Creditcardpayment } from './creditcardpayment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }
  payWithCard(creditCardPayment:Creditcardpayment):Observable<boolean>{
    console.log("service called")
    let url =" http://localhost:5004/api/payments";
    return this.httpClient.post<boolean>(url,creditCardPayment);
    }
  }
