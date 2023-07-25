import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private http:HttpClient) { }

  getFarmerCollection(id:any):Observable<any>{
    let url="http://localhost:5154/api/goodscollections/farmerunverifiedcollection/"+id;
    console.log(url);
    return this.http.get<any>(url);
  }
    getVerifiedCollection(collectionId:any):Observable<any>{
      let url="http://localhost:5154/api/goodscollections/verified/"+collectionId;
      console.log(url);
      return this.http.get<any>(url);
}
}