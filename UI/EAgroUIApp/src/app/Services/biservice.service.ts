import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YearRevenue } from '../Models/year-revenue';
import { QuarterRevenue } from '../Models/quarter-revenue';
import { MonthRevenue } from '../Models/month-revenue';
import { WeekRevenue } from '../Models/week-revenue';
import { CropRevenue } from '../Models/crop-revenue';

@Injectable({
  providedIn: 'root'
})
export class BIService {

  constructor(private http: HttpClient) { }



  getCollectionCenterYearlyRevenue(): Observable<YearRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/year/" + collectionCenterId;
    return this.http.get<any>(url);
  }
  getCollectionCenterQuarterlyRevenue(year: number): Observable<QuarterRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/quarter/" + collectionCenterId + "/" + year;
    return this.http.get<any>(url);
  }
  getCollectionCenterMonthlyRevenue(year: number): Observable<MonthRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/month/" + collectionCenterId + "/" + year;
    return this.http.get<any>(url);
  }
  getCollectionCenterWeeklyRevenue(year: number): Observable<WeekRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/week/" + collectionCenterId + "/" + year;
    return this.http.get<any>(url);
  }

  getCollectionCenterYearWiseCropRevenue(year:number): Observable<CropRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/crop/year/" + collectionCenterId + "/" + year;
    return this.http.get<any>(url);
  }
  getCollectionCenterQuarterWiseCropRevenue(year:number,quarter:number): Observable<CropRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/crop/quarter/" + collectionCenterId + "/" + year+ "/" + quarter;
    return this.http.get<any>(url);
  }

  getCollectionCenterMonthWiseCropRevenue(year:number,monthName:string): Observable<CropRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/crop/month/" + collectionCenterId + "/" + year+ "/" + monthName;
    return this.http.get<any>(url);
  }

   getCollectionCenterWeekWiseCropRevenue(startDate:string,endDate:string): Observable<CropRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/crop/dates/" + collectionCenterId + "/" + startDate+ "/" + endDate;
    return this.http.get<any>(url);
  }

  getYearsForCropRevenues():Observable<number[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/crop/years/" + collectionCenterId 
    return this.http.get<any>(url);
  }

}
