import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Farmerinvoice } from '../Models/farmerinvoice';
import { Invoicelist } from '../Models/invoicelist';
import { Invoicedetails } from '../Models/invoicedetails';
import { Invoice } from '../Models/invoice';
import { FilterRequest } from '../filter/filter-request';
import { CollectionCenterInvoiceDetails } from '../Models/collection-center-invoice-details';

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
  
  getInvoices(status: string): Observable<Invoice[]> {
    let merchantId = localStorage.getItem('merchantId');
    let url =
      'http://localhost:5197/api/invoices/merchant/' +
      merchantId +
      '/status/' +
      status;
    return this.httpClient.get<Invoice[]>(url);
  }

  // getInvoiceDetails(invoiceId: number): Observable<InvoiceDetails> {
  //   let url = 'http://localhost:5197/api/invoices/details/' + invoiceId;
  //   return this.httpClient.get<InvoiceDetails>(url).pipe(
  //     switchMap((invoiceDetails) => {
  //       const corporateIds: number[] = [
  //         invoiceDetails.collectionCenterCorporateId,
  //         invoiceDetails.transporterCorporateId,
  //       ];
  //       const corporateIdString: string = corporateIds.join(',');
  //       const farmerIdString: string = invoiceDetails.farmerId.toString();

  //       const corporations$ =
  //         this.corporatesvc.getCorporates(corporateIdString);
  //       const farmers$ = this.usersvc.getUserNamesWithId(farmerIdString);

  //       return forkJoin([corporations$, farmers$]).pipe(
  //         map(([corporationNames, farmerName]) => {
  //           invoiceDetails.collectionCenterName = corporationNames[0].name;
  //           invoiceDetails.transporterName = corporationNames[1].name;
  //           invoiceDetails.farmerName = farmerName[0].name;
  //           return invoiceDetails;
  //         })
  //       );
  //     })
  //   );
  // }

  updateRate(invoiceId: number, body: any): Observable<boolean> {
    let url = 'http://localhost:5197/api/invoices/rate/' + invoiceId;
    return this.httpClient.patch<boolean>(url, body);
  }

  getCollectionCenterInvoices(
    filterRequest: FilterRequest,
    pageNumber: number,
    status: string
  ): Observable<HttpResponse<Invoice[]>> {
    const collectionCenterId = localStorage.getItem('collectionCenterId');
    let url =
      'http://localhost:5197/api/invoices/collectionCenter/' +
      collectionCenterId +
      '/status/' +
      status;
    const params = new HttpParams().set('pageNumber', pageNumber.toString());
    return this.httpClient.post<Invoice[]>(url, filterRequest, {
      params: params,
      observe: 'response',
    });
  }

  getCollectionCenterInvoicDetails(
    invoiceId: number
  ): Observable<CollectionCenterInvoiceDetails> {
    const collectionCenterId = localStorage.getItem('collectionCenterId');
    let url =
      'http://localhost:5197/api/invoices/collectionCenter/' +
      collectionCenterId +
      '/invoice/' +
      invoiceId;
    return this.httpClient.get<CollectionCenterInvoiceDetails>(url);
  }
}



