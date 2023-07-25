import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionDetails } from './collectioncenter/collection-details';
import { GoodsCollection } from './collectioncenter/goods-collection';
import { UnverifiedCollection } from './collectioncenter/unverified-collection';
import { UpdateCollection } from './collectioncenter/update-collection';
import { FilterRequest } from './Shared/filter/filter-request';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getCollections(filterRequest: FilterRequest, pageNumber: number): Observable<HttpResponse<any>> {
    const collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5154/api/goodscollections/" + collectionCenterId;
    const params = new HttpParams().set('pageNumber', pageNumber.toString());
    return this.http.post<any[]>(url, filterRequest, { params: params, observe: 'response' });
  }


  addCollection(collection: GoodsCollection): Observable<boolean> {
    let url = "http://localhost:5154/api/goodscollections";
    return this.http.post<boolean>(url, collection);
  }

  getCollectionsForVerification(): Observable<UnverifiedCollection[]> {
    const collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5154/api/goodscollections/unverified/" + collectionCenterId;
    return this.http.get<UnverifiedCollection[]>(url);
  }

  updateCollection(collection: UpdateCollection): Observable<boolean> {
    let url = "http://localhost:5154/api/goodscollections";
    return this.http.put<boolean>(url, collection);
  }

  removeCollection(collectionId: number): Observable<boolean> {
    let url = "http://localhost:5154/api/goodscollections/" + collectionId;
    return this.http.delete<boolean>(url);
  }

}
