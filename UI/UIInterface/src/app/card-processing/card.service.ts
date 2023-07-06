import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cardpayment } from './cardpayment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient:HttpClient) { }
payWithCard(cardPayment:Cardpayment):Observable<boolean>{
  console.log("service called")
  let url =" http://localhost:5181/api/creditcards/cardpayment";
  return this.httpClient.post<boolean>(url,cardPayment);
  }
}

