import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private http: HttpClient) { }

  getFarmerCollection(id: any): Observable<any> {
    let url = "http://localhost:5051/api/farmerscollections/unverifiedcollection/" + id;
    console.log(url);
    return this.http.get<any>(url);
  }
  getVerifiedCollection(farmerId: any): Observable<any> {
    let url = "http://localhost:5051/api/farmerscollections/verified/" + farmerId;
    console.log(url);
    return this.http.get<any>(url);
  }
  getMonthlyRevenue(farmerId: any): Observable<any> {
    let url = "http://localhost:5051/api/farmerscollections/monthlyrevenue/" + farmerId;
    return this.http.get<any>(url);
  }
}