import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionmanagerService {

  constructor(private httpClient:HttpClient) { }

  getCollectionCenterId(userId: number): Observable<number> {
    let url ='http://localhost:5192/api/collectioncenters/managerId/' + userId;
    return this.httpClient.get<number>(url);
  }
}
