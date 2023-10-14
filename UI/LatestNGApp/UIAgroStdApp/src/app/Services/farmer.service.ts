import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionList } from '../Models/collectionlist';
import { CollectionDetails } from '../Models/collectiondetails';
import { YearRevenue } from '../Models/year-revenue';
import { QuarterRevenue } from '../Models/quarter-revenue';
import { MonthRevenue } from '../Models/month-revenue';
import { WeekRevenue } from '../Models/week-revenue';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  constructor(private httpClient:HttpClient) { }
  private selectedCollectionIdSubject = new BehaviorSubject<any>(null);
  selectedCollectionId$ = this.selectedCollectionIdSubject.asObservable();

  setSelectedCollectionId(collectionId: number,type:string) {
    this.selectedCollectionIdSubject.next({collectionId,type});
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
totalRevenue(): Observable<number> {
  let farmerId=Number(localStorage.getItem("userId"));
  const collectionDate = new Date().toISOString().split('T')[0];
  let url ='http://localhost:5168/api/farmersgoodscollections/revenue/' + farmerId;
  console.log(url);
  return this.httpClient.get<number>(url);

}

getFarmerYearlyRevenue(): Observable<YearRevenue[]> {
  let farmerId = localStorage.getItem("userId");
  let url = "http://localhost:5235/api/farmer/revenue/year/" + farmerId;
  return this.httpClient.get<any>(url);
}
getFarmerQuarterlyRevenue(year: number): Observable<QuarterRevenue[]> {
  let farmerId = localStorage.getItem("userId");
  let url = "http://localhost:5235/api/farmer/revenue/quarter/" + farmerId + "/" + year;
  return this.httpClient.get<any>(url);
}
getFarmerMonthlyRevenue(year: number): Observable<MonthRevenue[]> {
  let farmerId = localStorage.getItem("userId");
  let url = "http://localhost:5235/api/farmer/revenue/month/" + farmerId + "/" + year;
  return this.httpClient.get<any>(url);
}
getFarmerWeeklyRevenue(year: number): Observable<WeekRevenue[]> {
  let farmerId = localStorage.getItem("userId");
  let url = "http://localhost:5235/api/Farmer/revenue/week/" + farmerId + "/" + year;
  return this.httpClient.get<any>(url);
}

}