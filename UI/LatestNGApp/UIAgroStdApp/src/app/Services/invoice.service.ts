import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Farmerinvoice } from '../Models/farmerinvoice';
import { Invoicelist } from '../Models/invoicelist';
import { Invoicedetails } from '../Models/invoicedetails';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient:HttpClient) { }
  private selectedInvoiceIdSubject = new BehaviorSubject<any>(null);
  setSelectedInvoiceId$ = this.selectedInvoiceIdSubject.asObservable();

  setSelectedInvoiceId(invoiceId: number) {
    this.selectedInvoiceIdSubject.next(invoiceId);
    console.log(invoiceId);
  }
  getCollectionInvoice(collectionId:any):Observable<Farmerinvoice>{
    let url = "http://localhost:5197/api/invoices/collectioninvoice/" + collectionId;
    return this.httpClient.get<Farmerinvoice>(url);
  }
  getInvoicelist():Observable<Invoicelist[]>{
    let farmerId=localStorage.getItem("userId");
    let url = "http://localhost:5197/api/invoices/farmerinvoicelist/" + farmerId;
    return this.httpClient.get<Invoicelist[]>(url);
  }
  
  getInvoiceDetails(invoiceId:any):Observable<Invoicedetails>{
    let url = "http://localhost:5197/api/invoices/details/" + invoiceId;
    return this.httpClient.get<Invoicedetails>(url);
  }

}
