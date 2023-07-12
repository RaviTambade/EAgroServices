import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<any> {

    let url = "http://localhost:5197/api/invoices/merchant/1"; //replace id by the merchant company id whose user requsting this
    return this.http.get<any>(url);
  }

  getInvoiceDetails(invoiceId:number):Observable<any> {
    let url = "http://localhost:5197/api/invoices/details/"+invoiceId; 
    return this.http.get<any>(url);
  }

}
