import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collectioncenter } from './collectioncenter';

@Injectable({
  providedIn: 'root'
})
export class CollectioncenterService {

  constructor(private http: HttpClient) { }


  addCollectioncenter(collectionCenter: Collectioncenter): Observable<boolean> {
    let url = "http://localhost:5192/api/collectioncenters";
    return this.http.post<any>(url, collectionCenter);
  }
}
