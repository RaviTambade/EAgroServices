import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionList } from '../Models/collectionlist';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private httpClient:HttpClient) { }
 collectionDetails:any[]= [{Date:'12-3-2023',Crop:'tomato',Weight:'120kg',Quantity:12,Rate:30},
              {id:1,Date:'12-3-2023',Crop:'potato',Weight:'100kg',Quantity:12,Rate:30},
              {id:2,Date:'12-3-2023',Crop:'cabage',Weight:'125kg',Quantity:30,Rate:20},
              {id:3,Date:'12-3-2023',Crop:'beetroot',Weight:'156kg',Quantity:60,Rate:12},
              {id:4,Date:'12-3-2023',Crop:'potato',Weight:'108kg',Quantity:15,Rate:45},
              {id:5,Date:'12-3-2023',Crop:'tomato',Weight:'150kg',Quantity:18,Rate:13},];

  collectionDetail(id:number){
    return this.collectionDetails.find(collectionDetails => collectionDetails.id === id);
             
  }
  collectionList(farmerId:number):Observable<CollectionList[]>{
    let url ='http://localhost:5192/api/farmerscollections/collectionlist/' + farmerId;
    return this.httpClient.get<CollectionList[]>(url);
    
  }
}
