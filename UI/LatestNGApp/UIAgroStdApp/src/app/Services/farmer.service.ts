import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionList } from '../Models/collectionlist';
import { CollectionDetails } from '../Models/collectiondetails';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private httpClient:HttpClient) { }

  
  collectionList():Observable<CollectionList[]>{
    let farmerId=Number(localStorage.getItem("farmerId"));
    let url ='http://localhost:5051/api/farmerscollections/collectionlist/' + farmerId;
    return this.httpClient.get<CollectionList[]>(url);
    
  }

  collectionDetail(collectionId:number): Observable<CollectionDetails> {
      // let farmerId=Number(localStorage.getItem("farmerId"));
      let url ='http://localhost:5051/api/farmerscollections/collectiondetails/' + collectionId;
      return this.httpClient.get<CollectionDetails>(url);
  }
}
