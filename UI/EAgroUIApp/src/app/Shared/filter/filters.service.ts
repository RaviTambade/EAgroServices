import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FilterRequest } from './filter-request';
import { CollectionCenterFilterFor } from './collection-center-filter-for';


type requestObject = {
  request: FilterRequest
  pageNumber: number
};

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  
  private toatalPages = new Subject<number>();
  private verifiedCollectionFilterRequestSender = new Subject<requestObject>();
  private CollectionFilterRequestSender = new Subject<requestObject>();
  private ShippedCollectionFilterRequestSender = new Subject<requestObject>();
  private collectionPaymentListFilterRequestSender = new Subject<requestObject>();

  constructor(private http: HttpClient) { }

  sendTotalPages(data: number) {
    this.toatalPages.next(data);
  }

  getTotalPages() {
    return this.toatalPages.asObservable();
  }

  sendVerifiedCollectionFilterRequest(filterRequest: FilterRequest, pageNumber: number) {
    this.verifiedCollectionFilterRequestSender.next({ request: filterRequest, pageNumber: pageNumber });
  }

  getVerifiedCollectionFilterRequest() {
    return this.verifiedCollectionFilterRequestSender.asObservable();
  }

  sendShippedCollectionFilterRequest(filterRequest: FilterRequest, pageNumber: number) {
    this.ShippedCollectionFilterRequestSender.next({ request: filterRequest, pageNumber: pageNumber });
  }

  getShippedCollectionFilterRequest() {
    return this.ShippedCollectionFilterRequestSender.asObservable();
  }

  sendCollectionFilterRequest(filterRequest: FilterRequest, pageNumber: number) {
    this.CollectionFilterRequestSender.next({ request: filterRequest, pageNumber: pageNumber });
  }

  getCollectionFilterRequest() {
    return this.CollectionFilterRequestSender.asObservable();
  }

  sendCollectionPaymentListFilterRequest(filterRequest: FilterRequest, pageNumber: number) {
    this.collectionPaymentListFilterRequestSender.next({ request: filterRequest, pageNumber: pageNumber });
  }

  getCollectionPaymentListFilterRequest() {
    return this.collectionPaymentListFilterRequestSender.asObservable();
  }


  getCrops(): Observable<any> {
    let url = "http://localhost:5250/api/crops/names"
    return this.http.get<any>(url);
  }

  getContainerTypes(): Observable<any> {
    let url = "http://localhost:5239/api/verifiedcollections/containertypes"
    return this.http.get<any>(url);
  }

  getGrades(): Observable<any> {
    let url = "http://localhost:5239/api/verifiedcollections/grades"
    return this.http.get<any>(url);
  }


  getAllProperties(filterFor: string): Observable<any> {
    let url = ''
    switch (filterFor) {
      case CollectionCenterFilterFor.collection:
        url = "http://localhost:5154/api/collections/filterhelper/getpropertynames";
        break;
      case CollectionCenterFilterFor.verifiedCollection:
        url = "http://localhost:5154/api/verifiedcollectiondetails/filterhelper/getpropertynames";
        break;

      case CollectionCenterFilterFor.shippedCollection:
        url = "http://localhost:5067/api/shippedcollections/filterhelper/getpropertynames"
        break;

      case CollectionCenterFilterFor.collectionPayments:
        url = "http://localhost:5197/api/collectioncenterinvoice/filterhelper/getpropertynames"
        break;

    }
    return this.http.get<any>(url);

  }


  getEqualProperties(filterFor: string): Observable<any> {
    let url = ''
    switch (filterFor) {
      case CollectionCenterFilterFor.collection:
        url = "http://localhost:5154/api/collections/filterhelper/getequalproperties";
        break;
      case CollectionCenterFilterFor.verifiedCollection:
        url = "http://localhost:5154/api/verifiedcollectiondetails/filterhelper/getequalproperties"
        break;
      case CollectionCenterFilterFor.shippedCollection:
        url = "http://localhost:5067/api/shippedcollections/filterhelper/getequalproperties"
        break;
      case CollectionCenterFilterFor.collectionPayments:
        url = "http://localhost:5197/api/collectioncenterinvoice/filterhelper/getequalproperties"
        break;
    }
    return this.http.get<any>(url);
  }

  getRangeProperties(filterFor: string): Observable<any> {
    let url = ''
    switch (filterFor) {
      case CollectionCenterFilterFor.collection:
        url = "http://localhost:5154/api/collections/filterhelper/getrangeproperties";
        break;
      case CollectionCenterFilterFor.verifiedCollection:
        url = "http://localhost:5154/api/verifiedcollectiondetails/filterhelper/getrangeproperties"
        break;
      case CollectionCenterFilterFor.shippedCollection:
        url = "http://localhost:5067/api/shippedcollections/filterhelper/getrangeproperties"
        break;
      case CollectionCenterFilterFor.collectionPayments:
        url = "http://localhost:5197/api/collectioncenterinvoice/filterhelper/getrangeproperties"
        break;
    }
    return this.http.get<any>(url);
  }

  getDateRangeProperties(filterFor: string): Observable<any> {
    let url = ''
    switch (filterFor) {
      case CollectionCenterFilterFor.collection:
        url = "http://localhost:5154/api/collections/filterhelper/getdaterangeproperties";
        break;
      case CollectionCenterFilterFor.verifiedCollection:
        url = "http://localhost:5154/api/verifiedcollectiondetails/filterhelper/getdaterangeproperties"
        break;
      case CollectionCenterFilterFor.shippedCollection:
        url = "http://localhost:5067/api/shippedcollections/filterhelper/getdaterangeproperties"
        break;
      case CollectionCenterFilterFor.collectionPayments:
        url = "http://localhost:5197/api/collectioncenterinvoice/filterhelper/getdaterangeproperties"
        break;
    }
    return this.http.get<any>(url);
  }
}
