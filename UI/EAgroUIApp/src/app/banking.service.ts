import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInfo } from './merchant/account-info';
import { PaymentTransferDetails } from './merchant/payment-transfer-details';

@Injectable({
  providedIn: 'root'
})
export class BankingService {

  constructor(private http: HttpClient) { }

  getFarmerAccountInfo(farmerId: number): Observable<AccountInfo> {
    let url = "http://localhost:5053/api/accounts/details";
    let body = {
      "Usertype": "person",
      "DependancyId": farmerId
    }
    return this.http.post<any>(url, body);
  }

  getCorporateAccountInfo(corporateId: number): Observable<AccountInfo> {
    let url = "http://localhost:5053/api/accounts/details";
    let body = {
      "Usertype": "corporation",
      "DependancyId": corporateId
    }
    return this.http.post<any>(url, body);
  }

  fundTransfer(payment: PaymentTransferDetails): Observable<number> {
    let url = "http://localhost:5001/api/fundstransfer";
    return this.http.post<any>(url, payment);
  }
}
