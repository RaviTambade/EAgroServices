import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collectioncenter } from './collectioncenter';
import { CollectionDetails } from './collectioncenter/collection-details';

@Injectable({
  providedIn: 'root'
})
export class CollectioncenterService {

  constructor(private http: HttpClient) { }

  getCollectionCenterId(userId: number): Observable<number> {
    let url = "http://localhost:5192/api/collectioncenters/inspectorid/" + userId;
    return this.http.get<number>(url);
  }
  
  addCollectioncenter(collectionCenter: Collectioncenter): Observable<boolean> {
    let url = "http://localhost:5192/api/collectioncenters";
    return this.http.post<any>(url, collectionCenter);
  }

  
}
