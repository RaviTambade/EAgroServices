import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCollectionList } from '../Models/allcollectionlist';

@Injectable({
  providedIn: 'root'
})
export class CollectionmanagerService {

  constructor(private httpClient:HttpClient) { }

  getCollectionCenterId(): Observable<number> {
    const userId=localStorage.getItem("userId");
    let url ='http://localhost:5192/api/collectioncenters/managerId/' + userId;
    return this.httpClient.get<number>(url);
  }
  getCollectionList(type:string,collectionCenterId:number):Observable<AllCollectionList[]>{
    let url ='http://localhost:5154/api/goodscollections/collectionlist/'+collectionCenterId
    const params = new HttpParams().set('type', type);
    console.log(url)
    return this.httpClient.get<AllCollectionList[]>(url,
    {
      params: params,
    });
  }
}
