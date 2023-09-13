import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmerinvoice } from '../Models/farmerinvoice';
import { Invoicelist } from '../Models/invoicelist';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient:HttpClient) { }
  getCollectionInvoice(collectionId:any):Observable<Farmerinvoice>{
    let url = "http://localhost:5197/api/invoices/collectioninvoice/" + collectionId;
    return this.httpClient.get<Farmerinvoice>(url);
  }
  getInvoicelist():Observable<Invoicelist[]>{
    let farmerId=localStorage.getItem("farmerId");
    let url = "http://localhost:5197/api/invoices/farmerinvoicelist/" + farmerId;
    return this.httpClient.get<Invoicelist[]>(url);
  }
}
