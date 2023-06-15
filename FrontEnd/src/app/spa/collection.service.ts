import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collectionviewmodel } from '../vendors/collectionviewmodel';
import { DatePipe } from '@angular/common';
import { Collection } from '../vendors/collection';
import { SellBilling } from '../vendors/sell-billing';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getCollections(): Observable<Collectionviewmodel[]> {

    const datePipe = new DatePipe('en-US');
    const currentDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(currentDate);

    const date = {
      "date": currentDate
    }
    let url = "http://localhost:5031/api/collections/getall"
    return this.http.post<Collectionviewmodel[]>(url, date);
  }

  getCollection(id: number): Observable<any> {
    let url = "http://localhost:5031/api/collections/" + id;
    return this.http.get<Collectionviewmodel>(url);
  }
  editCollection(id: number, collection: Collection): Observable<any> {
    console.log("service called")
    let url = "http://localhost:5031/api/collections/" + id;
    return this.http.put<any>(url, collection)
  }
  getfarmers(): Observable<any> {
    let url = "http://localhost:5141/api/farmers"
    return this.http.get(url)
  }
  getfarmer(farmerId: number): Observable<any> {
    let url = "http://localhost:5141/api/farmers/" + farmerId;
    return this.http.get(url)
  }

  getCollectionByFarmer(farmerId: number): Observable<any> {
    let url = "http://localhost:5141/api/farmers/collections/" + farmerId
    return this.http.get<any>(url)
  }
  getcollectionBill(collectionid: number): Observable<any> {
    let url = "http://localhost:5031/api/collections/" + collectionid + "/billing";
    return this.http.get<any>(url)
  }

  collectiontransportation(collectionid: number): Observable<any> {
    let url = "http://localhost:5031/api/collections/" + collectionid + "/sell";
    return this.http.get<any>(url)
  }

  insertBillDetails(sellbill: any): Observable<any> {
    console.log("fuc called")
    console.log(sellbill)
    let url = "http://localhost:5182/api/sells";
    return this.http.post<any>(url, sellbill)
  }
  addCollection(collection:Collection):Observable<any>{
    let url="http://localhost:5031/api/collections"
    return this.http.post<any>(url,collection)
  }

  getCrops():Observable<any>{
    let url=" http://localhost:5224/api/crops"
    return this.http.get<any>(url)
  }



}
