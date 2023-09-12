import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmerinvoice } from '../Models/farmerinvoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient:HttpClient) { }
  getCollectionInvoice(collectionId:any):Observable<Farmerinvoice>{
    let url = "http://localhost:5197/api/invoices/collectioninvoice/" + collectionId;
    return this.httpClient.get<Farmerinvoice>(url);
  }
}
