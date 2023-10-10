import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionList } from '../Models/collectionlist';
import { CollectionDetails } from '../Models/collectiondetails';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private httpClient:HttpClient) { }
  private selectedCollectionIdSubject = new BehaviorSubject<any>(null);
  selectedCollectionId$ = this.selectedCollectionIdSubject.asObservable();

  setSelectedCollectionId(collectionId: number) {
    this.selectedCollectionIdSubject.next(collectionId);
    console.log(collectionId);
  }
  
  collectionList():Observable<CollectionList[]>{
    let farmerId=Number(localStorage.getItem("userId"));
    let url ='http://localhost:5051/api/farmerscollections/collectionlist/' + farmerId;
    return this.httpClient.get<CollectionList[]>(url);
    
  }

  collectionDetail(collectionId:number): Observable<CollectionDetails> {
      let url ='http://localhost:5051/api/farmerscollections/collectiondetails/' + collectionId;
      return this.httpClient.get<CollectionDetails>(url);
  }
  collectionCount(): Observable<number> {
    let farmerId=Number(localStorage.getItem("userId"));
    let url ='http://localhost:5168/api/farmersgoodscollections/' + farmerId;
    return this.httpClient.get<number>(url);
}
todayCollectionCount(): Observable<number> {
  let farmerId=Number(localStorage.getItem("userId"));
  const collectionDate = new Date().toISOString().split('T')[0];
  let url ='http://localhost:5168/api/farmersgoodscollections/' + farmerId+'/'+collectionDate;
  console.log(url);
  return this.httpClient.get<number>(url);

}


}