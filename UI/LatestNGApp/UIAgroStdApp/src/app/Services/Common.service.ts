import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionCenter } from '../Models/collectioncenter';
import { AccountInfo } from '../Models/account-info';
import { BankStatement } from '../Models/bank-statement';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient:HttpClient) { }
  
  getFarmerAccountInfo(farmerId: number): Observable<AccountInfo> {
    let url = "http://localhost:5053/api/accounts/details";
    let body = {
      "Usertype": "person",
      "DependencyId": farmerId     
    }
    return this.httpClient.post<AccountInfo>(url, body);
  }
  getBankStatement(acctNumber: string): Observable<BankStatement[]> {
    let url = "http://localhost:5053/api/banking/accounts/" + acctNumber + "/statement";
    return this.httpClient.get<BankStatement[]>(url);
  }
  
  getCorporates(corporateId:number):Observable<CollectionCenter[]> {
    let url ='http://localhost:5041/api/corporates/names/'+ corporateId;
    console.log(corporateId);
    return this.httpClient.get<CollectionCenter[]>(url);
  }


}