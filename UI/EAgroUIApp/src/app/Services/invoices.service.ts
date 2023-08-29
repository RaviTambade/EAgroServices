import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, retry, switchMap } from 'rxjs';
import { Invoice } from '../Models/invoice';
import { InvoiceDetails } from '../Models/invoice-details';
import { FilterRequest } from '../Shared/filter/filter-request';
import { CollectionCenterInvoiceDetails } from '../Models/collection-center-invoice-details';
import { CorporateService } from './corporate.service';
import { UserService } from '../Shared/users/user.service';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(
    private http: HttpClient,
    private corporatesvc: CorporateService,
    private usersvc: UserService
  ) {}
  getInvoices(status: string): Observable<Invoice[]> {
    let merchantId = localStorage.getItem('merchantId');
    let url =
      'http://localhost:5197/api/invoices/merchant/' +
      merchantId +
      '/status/' +
      status;
    return this.http.get<Invoice[]>(url);
  }

  getInvoiceDetails(invoiceId: number): Observable<InvoiceDetails> {
    let url = 'http://localhost:5197/api/invoices/details/' + invoiceId;
    return this.http.get<InvoiceDetails>(url).pipe(
      switchMap((invoiceDetails) => {
        const corporateIds: number[] = [
          invoiceDetails.collectionCenterCorporateId,
          invoiceDetails.transporterCorporateId,
        ];
        const corporateIdString: string = corporateIds.join(',');
        const farmerIdString: string = invoiceDetails.farmerId.toString();

        const corporations$ =
          this.corporatesvc.getCorporates(corporateIdString);
        const farmers$ = this.usersvc.getUserNamesWithId(farmerIdString);

        return forkJoin([corporations$, farmers$]).pipe(
          map(([corporationNames, farmerName]) => {
            invoiceDetails.collectionCenterName = corporationNames[0].name;
            invoiceDetails.transporterName = corporationNames[1].name;
            invoiceDetails.farmerName = farmerName[0].name;
            return invoiceDetails;
          })
        );
      })
    );
  }

  updateRate(invoiceId: number, body: any): Observable<boolean> {
    let url = 'http://localhost:5197/api/invoices/rate/' + invoiceId;
    return this.http.patch<boolean>(url, body);
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
    return this.http.post<Invoice[]>(url, filterRequest, {
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
    return this.http.get<CollectionCenterInvoiceDetails>(url);
  }
}
