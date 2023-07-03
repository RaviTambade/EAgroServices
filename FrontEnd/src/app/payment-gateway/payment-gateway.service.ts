import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {

  constructor(private http:HttpClient) { }

  fundTransfer(credential:any){
    let url ="http://localhost:5041/FundTransfer";
    return this.http.post(url,credential);
  }
}
