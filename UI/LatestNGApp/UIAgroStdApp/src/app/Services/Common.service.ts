import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionCenter } from '../Models/collectioncenter';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient:HttpClient) { }

  getCollectionCenterName(corporateId:number):Observable<CollectionCenter[]> {
    let url ='http://localhost:5041/api/corporates/names/'+ corporateId;
    console.log(corporateId);
    return this.httpClient.get<CollectionCenter[]>(url);
  }


}