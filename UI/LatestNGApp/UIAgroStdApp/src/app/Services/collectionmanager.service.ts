import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCollectionList } from '../Models/allcollectionlist';

@Injectable({
  providedIn: 'root'
})
export class CollectionmanagerService {

  constructor(private httpClient:HttpClient) { }

  getCollectionCenterId(userId: number): Observable<number> {
    let url ='http://localhost:5192/api/collectioncenters/managerId/' + userId;
    return this.httpClient.get<number>(url);
  }
  getCollectionList(type:string):Observable<AllCollectionList>{
    const collectionId=localStorage.getItem("collectionId")
    let url ='http://localhost:5154/api/goodscollection/collectionlist/'+collectionId
    const params = new HttpParams()
    .set('type', type);
    return this.httpClient.get<AllCollectionList>(url);
  }
}
