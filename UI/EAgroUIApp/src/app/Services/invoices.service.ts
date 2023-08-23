import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Invoice } from '../Models/invoice';
import { InvoiceDetails } from '../Models/invoice-details';
import { FilterRequest } from '../Shared/filter/filter-request';
import { CollectionCenterInvoiceDetails } from '../Models/collection-center-invoice-details';


@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getInvoices(status:string): Observable<Invoice[]> {
    let merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5197/api/invoices/merchant/" + merchantId +"/status/"+status;
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

  getCollectionCenterInvoices(filterRequest: FilterRequest, pageNumber: number,status:string): Observable<HttpResponse<any>> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5197/api/invoices/collectionCenter/" + collectionCenterId+"/status/"+status;
    const params = new HttpParams().set('pageNumber', pageNumber.toString());
    return this.http.post<any[]>(url, filterRequest, { params: params, observe: 'response' });  }

  getCollectionCenterInvoicDetails(invoiceId:number): Observable<CollectionCenterInvoiceDetails> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5197/api/invoices/collectionCenter/" + collectionCenterId+"/invoice/"+invoiceId;
    return this.http.get<CollectionCenterInvoiceDetails>(url);
  }


}
