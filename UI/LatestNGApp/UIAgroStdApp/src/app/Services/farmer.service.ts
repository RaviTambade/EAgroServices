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

  collectionDetail(): Observable<CollectionDetails[]> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5051/api/farmerscollections/unverifiedcollection/" + farmerId;
    console.log(url);
    return this.httpClient.get<CollectionDetails[]>(url);
  }
}
