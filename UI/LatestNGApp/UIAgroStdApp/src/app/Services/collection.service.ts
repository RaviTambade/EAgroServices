import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterRequest } from '../filter/filter-request';
import { Observable } from 'rxjs';
import { Collections } from '../Models/collections';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http:HttpClient) { }

  getCollections(
    collectionCenterId:number,
    filterRequest: FilterRequest,
    pageNumber: number,
    type: string
  ): Observable<HttpResponse<Collections[]>> {
    let url =
      'http://localhost:5154/api/goodscollections/' + collectionCenterId;
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('type', type);

    return this.http.post<any>(url, filterRequest, {
      params: params,
      observe: 'response',
    });
  }
}
