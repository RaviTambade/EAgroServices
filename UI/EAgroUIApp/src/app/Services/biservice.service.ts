import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YearRevenue } from '../Models/year-revenue';
import { QuarterRevenue } from '../Models/quarter-revenue';
import { MonthRevenue } from '../Models/month-revenue';
import { WeekRevenue } from '../Models/week-revenue';
import { CropRevenue } from '../Models/crop-revenue';
import { Merchantcollectioncount } from '../Models/merchantcollectioncount';
import { MerchantcollectioncountMonth } from '../Models/merchantcollectioncount-month';
import { MerchantcollectioncountQuarter } from '../Models/merchantcollectioncount-quarter';
import { MerchantcollectioncountWeek } from '../Models/merchantcollectioncount-week';

@Injectable({
  providedIn: 'root'
})
export class BIService {

  constructor(private http: HttpClient) { }



  getCollectionCenterYearlyRevenue(): Observable<YearRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/collectioncenterbi/revenue/year/" + collectionCenterId;
    return this.http.get<any>(url);
  }
  getCollectionCenterQuarterlyRevenue(year: number): Observable<QuarterRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/collectioncenterbi/revenue/quarter/" + collectionCenterId + "/" + year;
    return this.http.get<any>(url);
  }
  getCollectionCenterMonthlyRevenue(year: number): Observable<MonthRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/collectioncenterbi/revenue/month/" + collectionCenterId + "/" + year;
    return this.http.get<any>(url);
  }
  getCollectionCenterWeeklyRevenue(year: number): Observable<WeekRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/CollectionCenterBI/revenue/week/" + collectionCenterId + "/" + year;
    return this.http.get<any>(url);
  }

  getCollectionCenterYearWiseCropRevenue(year: number): Observable<CropRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/collectioncenterbi/revenue/crop/year/" + collectionCenterId + "/" + year;
    return this.http.get<any>(url);
  }
  getCollectionCenterQuarterWiseCropRevenue(year: number, quarter: number): Observable<CropRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/collectioncenterbi/revenue/crop/quarter/" + collectionCenterId + "/" + year + "/" + quarter;
    return this.http.get<any>(url);
  }

  getCollectionCenterMonthWiseCropRevenue(year: number, monthName: string): Observable<CropRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/collectioncenterbi/revenue/crop/month/" + collectionCenterId + "/" + year + "/" + monthName;
    return this.http.get<any>(url);
  }

  getCollectionCenterWeekWiseCropRevenue(startDate: string, endDate: string): Observable<CropRevenue[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/collectioncenterbi/revenue/crop/dates/" + collectionCenterId + "/" + startDate + "/" + endDate;
    return this.http.get<any>(url);
  }

  getYearsForCropRevenues(): Observable<number[]> {
    let collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5235/api/collectioncenterbi/revenue/crop/years/" + collectionCenterId
    return this.http.get<any>(url);
  }
  getCollectionCenterCountByYear(year:number): Observable<Merchantcollectioncount[]> {
    let merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5235/api/merchantbi/count/year/" + merchantId+ "/"+year;
    return this.http.get<Merchantcollectioncount[]>(url);
  }

  getCollectionCenterCountByMonth(year:number,month:string): Observable<MerchantcollectioncountMonth[]> {
    let merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5235/api/merchantbi/count/month/" + merchantId + "/"+year + "/" + month ;
    console.log(url);
    return this.http.get<MerchantcollectioncountMonth[]>(url);
    

  }
  getCollectionCenterCountByQuarter(year:number,quarter:number): Observable<MerchantcollectioncountQuarter[]> {
    let merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5235/api/merchantbi/count/quarter/" + merchantId + "/"+ year +"/"+ quarter;
    return this.http.get<MerchantcollectioncountQuarter[]>(url);
  }
  // getCollectionCenterCountByWeek(year:number): Observable<MerchantcollectioncountWeek[]> {
  //   let merchantId = localStorage.getItem("merchantId");
  //   let url = "http://localhost:5235/api/merchantbi/count/week/" + merchantId + "/"+year;
  //   return this.http.get<MerchantcollectioncountWeek[]>(url);
  // }
  getYearOfCollection():Observable<number[]>{
    let merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5235/api/merchantbi/count/year/" + merchantId;
    return this.http.get<number[]>(url);
              
  }
}
