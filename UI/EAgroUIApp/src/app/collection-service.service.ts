import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionDetails } from './collectioncenter/collection-details';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getCollections(): Observable<CollectionDetails[]> {
    const collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5154/api/goodscollections/" + collectionCenterId;
    return this.http.get<CollectionDetails[]>(url);
  }
  getContainerTypes(): Observable<string[]> {
    let url = "http://localhost:5154/api/goodscollections/containertypes";
    return this.http.get<string[]>(url);
  }

}
