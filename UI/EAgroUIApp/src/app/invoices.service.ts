import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Invoice } from './merchant/invoice';
import { InvoiceDetails } from './merchant/invoice-details';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    let merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5197/api/invoices/merchant/" + merchantId;
    return this.http.get<Invoice[]>(url);
  }

  getInvoiceDetails(invoiceId: number): Observable<InvoiceDetails> {
    let url = "http://localhost:5197/api/invoices/details/" + invoiceId;
    return this.http.get<InvoiceDetails>(url);
  }

  updateRate(invoiceId: number, body: any): Observable<boolean> {
    let url = "http://localhost:5197/api/invoices/rate/" + invoiceId;
    return this.http.patch<boolean>(url, body);
  }

}
