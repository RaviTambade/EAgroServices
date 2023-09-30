import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInfo } from '../Models/account-info';
import { PaymentTransferDetails } from '../Models/payment-transfer-details';
import { BankStatement } from '../Models/bank-statement';


@Injectable({
  providedIn: 'root'
})
export class BankingService {

  constructor(private http: HttpClient) { }

  getFarmerAccountInfo(farmerId: number): Observable<AccountInfo> {
    let url = "http://localhost:5053/api/accounts/details";
    let body = {
      "Usertype": "person",
      "DependencyId": farmerId     
    }
    return this.http.post<AccountInfo>(url, body);
  }

  getCorporateAccountInfo(corporateId: number): Observable<AccountInfo> {
    let url = "http://localhost:5053/api/accounts/details";
    let body = {
      "usertype": "corporation",
      "dependencyId": corporateId
    }
    console.log(body);
    return this.http.post<AccountInfo>(url, body);
  }

  fundTransfer(payment: PaymentTransferDetails): Observable<number> {
    let url = "http://localhost:5001/api/fundstransfer";
    return this.http.post<number>(url, payment);
  }
  getBankStatement(acctNumber: string): Observable<BankStatement[]> {
    let url = "http://localhost:5053/api/banking/accounts/" + acctNumber + "/statement";
    console.log(url);
    return this.http.get<BankStatement[]>(url);
  }
}
