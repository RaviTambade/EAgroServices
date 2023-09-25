import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AllCollectionList } from '../Models/allcollectionlist';
import { User } from '../Models/user';
import { Collection } from '../Models/collection';
import { VerifiedCollection } from '../Models/verifiedCollection';
import { CollectionDetails } from '../Models/collectiondetails';
import { Verifiedcollectiondetails } from '../Models/verifieddcollectiondetails';
import { Corporate } from '../Models/corporate';

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
  private selectedCollectionIdShipmentSubject = new BehaviorSubject<any>(null);
  selectedCollectionIdShipment$ = this.selectedCollectionIdSubject.asObservable();

  setSelectedCollectionIdForShipment(collectionId: number) {
    this.selectedCollectionIdShipmentSubject.next(collectionId);
    console.log(collectionId);
  }

  getCollectionCenterId(): Observable<number> {
    const userId=localStorage.getItem("userId");
    let url ='http://localhost:5192/api/collectioncenters/managerId/' + userId;
    return this.httpClient.get<number>(url);
  }
  getCollectionList(type:string,collectionCenterId:number):Observable<AllCollectionList[]>{
    console.log(type,collectionCenterId);
    let url ='http://localhost:5154/api/goodscollections/collectionlist/'+collectionCenterId
    const params = new HttpParams().set('type', type);
    console.log(url)
    return this.httpClient.get<AllCollectionList[]>(url,
    {
      params: params,
    });
  }
  getUser(id:string): Observable<User[]> {
    let url = "http://localhost:5102/api/users/name/" + id
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
    let url = "http://localhost:5154/api/goodscollections/verifiedcollectionlist/"+collectionCenterId;
    return this.httpClient.get<VerifiedCollection[]>(url);
  }
  getVerifiedCollectionDetails(collectionId:number):Observable<Verifiedcollectiondetails>{
    let url = "http://localhost:5154/api/goodscollections/verifiedcollectiondetail/"+collectionId;
    return this.httpClient.get<Verifiedcollectiondetails>(url);
  }
  collectionDetail(collectionId:number): Observable<Verifiedcollectiondetails> {
    let url ='http://localhost:5051/api/farmerscollections/collectiondetails/' + collectionId;
    return this.httpClient.get<Verifiedcollectiondetails>(url);
}
getCollectionCenterAndCorporateId(): Observable<Corporate[]> {
  let url =
    'http://localhost:5192/api/collectioncenters/collectioncenterandcorporateid';
  return this.httpClient.get<Corporate[]>(url);
}
}
