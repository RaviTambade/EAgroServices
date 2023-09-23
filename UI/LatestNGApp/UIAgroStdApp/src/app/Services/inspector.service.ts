import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionCenter } from '../Models/collectioncenter';
import { CollectionCenterId } from '../Models/collection-center';

@Injectable({
  providedIn: 'root'
})
export class InspectorService {

  constructor(private httpClient:HttpClient) { }
  getcollectionCenterId(): Observable<CollectionCenterId> {
    const userId=localStorage.getItem("userId");
    let url ='http://localhost:5192/api/inspectors/' + userId;
    return this.httpClient.get<CollectionCenterId>(url);
  }
  getcollectionCenterCorporateId(collectionCenterId:number): Observable<CollectionCenterId> {
    let url ='http://localhost:5192/api/collectioncenters/' +collectionCenterId;
    return this.httpClient.get<CollectionCenterId>(url);
  }
}
