import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VerifiedCollection } from './collectioncenter/verified-collection';

@Injectable({
  providedIn: 'root'
})
export class VerifiedCollectionService {

  constructor(private http: HttpClient) { }

  addVerifiedCollection(collection:VerifiedCollection): Observable<boolean> {
    let url = "http://localhost:5239/api/verifiedcollections/";
    return this.http.post<boolean>(url,collection);
  }}
