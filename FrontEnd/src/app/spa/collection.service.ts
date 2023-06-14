import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collectionviewmodel } from '../vendors/collectionviewmodel';
import { DatePipe } from '@angular/common';
import { Collection } from '../vendors/collection';

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
  editCollection(id:number,collection:Collection):Observable<any>{
    console.log("service called")
    let url="http://localhost:5031/api/collections/" + id;
    return this.http.put<any>(url,collection)
  }
  getfarmers():Observable<any>{
    let url="http://localhost:5141/api/farmers"
    return this.http.get(url)
  }
  getCollectionByFarmer(farmerId:number):Observable<any>{
    let url="http://localhost:5141/api/farmers/collections/" +farmerId
    return this.http.get<any>(url)
  }


  }




