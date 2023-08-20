import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YearRevenue } from '../year-revenue';
import { QuarterRevenue } from '../quarter-revenue';
import { MonthRevenue } from '../month-revenue';
import { WeekRevenue } from '../week-revenue';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private http: HttpClient) { }

  getFarmerCollection(): Observable<any> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5051/api/farmerscollections/unverifiedcollection/" + farmerId;
    console.log(url);
    return this.http.get<any>(url);
  }
  getCollection(): Observable<any> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5051/api/farmerscollections/" + farmerId;
    console.log(url);
    return this.http.get<any>(url);
  }
  VerifiedCollection(paymentStatus:string): Observable<any> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5051/api/farmerscollections/verified/" + farmerId+"/"+paymentStatus;
    console.log(url);
    return this.http.get<any>(url);
  }
  getVerifiedCollection(): Observable<any> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5051/api/farmerscollections/verifiedcollection/" + farmerId;
    console.log(url);
    return this.http.get<any>(url);
  }
  getCropRevenue(): Observable<any> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5051/api/farmerscollections/croprevenue/" + farmerId;
    console.log(url);
    return this.http.get<any>(url);
  }
  getFarmerIdByUserId(userId:any):Observable<any>{
    let url ="http://localhost:5051/api/farmerscollections/monthlyrevenue/" + userId;
    return this.http.get<any>(url);

  }
  getFarmerYearlyRevenue(): Observable<YearRevenue[]> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5235/api/Farmer/revenue/year/" + farmerId;
    return this.http.get<any>(url);
  }
  getFarmerQuarterlyRevenue(year: number): Observable<QuarterRevenue[]> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5235/api/Farmer/revenue/quarter/" + farmerId + "/" + year;
    return this.http.get<any>(url);
  }
  getFarmerMonthlyRevenue(year: number): Observable<MonthRevenue[]> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5235/api/Farmer/revenue/month/" + farmerId + "/" + year;
    return this.http.get<any>(url);
  }
  getFarmerWeeklyRevenue(year: number): Observable<WeekRevenue[]> {
    let farmerId = localStorage.getItem("farmerId");
    let url = "http://localhost:5235/api/Farmer/revenue/week/" + farmerId + "/" + year;
    return this.http.get<any>(url);
  }
  getCollectionInvoice(collectionId:any):Observable<any>{
    let url = "http://localhost:5197/api/invoices/collectioninvoice/" + collectionId;
    return this.http.get<any>(url);
  }
}