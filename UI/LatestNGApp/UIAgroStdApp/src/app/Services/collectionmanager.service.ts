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
import { CropQuantity } from '../Models/cropquantity';
import { AuthenticationService } from './authentication.service';
import { TokenClaims } from '../Models/Enum/tokenclaims';
import { Userdetails } from '../Models/userdetails';

@Injectable({
  providedIn: 'root'
})
export class CollectionmanagerService {

  constructor(private httpClient:HttpClient,private authService:AuthenticationService) { }

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
    const userId=this.authService.getNameIdFromToken();
    console.log("🚀 ~ getCollectionCenterId ~ userId:", userId);
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
  getUser(id:string): Observable<Userdetails[]> {
    let url = "http://localhost:5142/api/users/details/ids/" + id
    return this.httpClient.get<Userdetails[]>(url)
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
collectionCount(collectionCenterId:number): Observable<number> {
let url ='http://localhost:5168/api/farmersgoodscollections/collectioncenter/' + collectionCenterId;
return this.httpClient.get<number>(url);
}
todayCollectionCount(collectionCenterId:number): Observable<number> {
const collectionDate = new Date().toISOString().split('T')[0];
let url ='http://localhost:5168/api/farmersgoodscollections/collectioncenter/' + collectionCenterId+'/'+collectionDate;
console.log(url);
console.log(collectionCenterId);
return this.httpClient.get<number>(url);
}
totalCropQuantity(collectionCenterId:number): Observable<CropQuantity[]> {
  const collectionDate = new Date().toISOString().split('T')[0];
let url ='http://localhost:5168/api/farmersgoodscollections/cropquantity/' + collectionCenterId+'/'+collectionDate;
console.log(url);
return this.httpClient.get<CropQuantity[]>(url);

}
}
