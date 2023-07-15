import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private http:HttpClient) { }

  getFarmerDetails(id:any):Observable<any>{
    let url="http://localhost:5102/api/user/"+id;
    return this.http.get<any>(url);

  }
  getFarmerCollection(id:any):Observable<any>{
    let url="http://localhost:5154/api/goodscollections/farmercollection/"+id;
    return this.http.get<any>(url);
}
}