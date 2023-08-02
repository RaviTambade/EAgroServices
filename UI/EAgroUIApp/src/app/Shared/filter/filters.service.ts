import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FilterRequest } from './filter-request';


type requestObject = {
  request:FilterRequest
  pageNumber:number
};

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private toatalPages = new Subject<number>();
  private verifiedCollectionFilterRequestSender = new Subject<requestObject>();

  constructor(private http: HttpClient) { }

  // sendFilterRequest(filterRequest: FilterRequest, pageNumber: number): Observable<any> {
  //   const apiEndpoint: string = "http://localhost:5141/api/farmers/filter/3";
  //   const params = new HttpParams().set('pageNumber', pageNumber.toString());

  //   return this.http.post<any[]>(apiEndpoint, filterRequest, { params: params, observe: 'response' });
  // }

  // sendFilterRequest(filterRequest: FilterRequest, pageNumber: number): Observable<any> {
  //   const apiEndpoint: string = "http://localhost:5141/api/farmers/getcollectionswithbilling";
  //   const params = new HttpParams().set('pageNumber', pageNumber.toString());

  //   return this.http.post<any[]>(apiEndpoint, filterRequest, { params: params, observe: 'response' });
  // }

  sendTotalPages(data :number){
    this.toatalPages.next(data);
  } 

  getTotalPages(){
    return this.toatalPages.asObservable();
  }

  sendVerifiedCollectionFilterRequest(filterRequest: FilterRequest, pageNumber: number){
    this.verifiedCollectionFilterRequestSender.next({ request:filterRequest , pageNumber: pageNumber });
  }

  getVerifiedCollectionFilterRequest(){
    return this.verifiedCollectionFilterRequestSender.asObservable();
  }
  

  getAllProperties(): Observable<any> {
    let url = "http://localhost:5154/api/collectiondetails/filterhelper/getpropertynames";
    return this.http.get<any>(url);
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

  getEqualProperties(): Observable<any>{
    let url = "http://localhost:5154/api/collectiondetails/filterhelper/getequalproperties"
    return this.http.get<any>(url);
  }

  getRangeProperties(): Observable<any>{
    let url = "http://localhost:5154/api/collectiondetails/filterhelper/getrangeproperties"
    return this.http.get<any>(url);
  }

  getDateRangeProperties(): Observable<any>{
    let url = "http://localhost:5154/api/collectiondetails/filterhelper/getdaterangeproperties"
    return this.http.get<any>(url);
  }
}
