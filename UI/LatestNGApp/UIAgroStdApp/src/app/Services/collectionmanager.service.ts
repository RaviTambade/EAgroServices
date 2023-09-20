import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AllCollectionList } from '../Models/allcollectionlist';
import { User } from '../Models/user';
import { Collection } from '../Models/collection';
import { VerifiedCollection } from '../Models/verifiedCollection';
import { CollectionDetails } from '../Models/collectiondetails';

@Injectable({
  providedIn: 'root'
})
export class CollectionmanagerService {

  constructor(private httpClient:HttpClient) { }

  private selectedCollectionIdSubject = new BehaviorSubject<any>(null);
  selectedCollectionId$ = this.selectedCollectionIdSubject.asObservable();

  setSelectedCollectionId(collectionId: number) {
    this.selectedCollectionIdSubject.next(collectionId);
    console.log(collectionId);
  }

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
  getFarmer(farmerId:string): Observable<User[]> {
    let url = "http://localhost:5102/api/users/name/" + farmerId
    return this.httpClient.get<User[]>(url)
  }
  addCollection(collection:Collection): Observable<boolean> {
    let url = 'http://localhost:5154/api/goodscollections';
    return this.httpClient.post<boolean>(url, collection);
  }
  getContainerTypes(): Observable<string[]> {
    let url = "http://localhost:5239/api/verifiedcollections/containertypes";
    return this.httpClient.get<string[]>(url);
  }
  getVerifiedCollection(collectionCenterId:number):Observable<VerifiedCollection[]>{
    let url = "http://localhost:5154/api/goodscollections/verified/collectioncenter/"+collectionCenterId;
    return this.httpClient.get<VerifiedCollection[]>(url);
  }
  // getVerifiedCollectionDetails(collectionCenterId:number):Observable<CollectionDetails[]>{
  //   let url = "http://localhost:5154/api/goodscollections/verified/collectioncenter/"+collectionCenterId;
  //   return this.httpClient.get<CollectionDetails[]>(url);
  // }

 
}
