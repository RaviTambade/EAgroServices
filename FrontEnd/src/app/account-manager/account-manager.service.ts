import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../Account';


@Injectable({
  providedIn: 'root'
})
export class AccountManagerService {

  constructor(private http:HttpClient) { }


 public  UpdateAccount(account : Account):Observable<any>{
    let url="http://localhost:5053/bankaccounts/account"
    return this.http.put<any>(url,account);
  }
// 

 public addAccount(acct:Account):Observable<any>{
  let url ="http://localhost:5053/bankaccounts/account";
  return this.http.post<Account>(url,acct);
  }

  public getDetails(acctno:any):Observable<any>{
    let url ="http://localhost:5053/bankaccounts/account/"+ acctno;
    return this.http.get<Account>(url);
    }
}
