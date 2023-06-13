import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collectionviewmodel } from '../vendors/collectionviewmodel';
import { DatePipe } from '@angular/common';

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
  // editCollection(updateddata: any): any {
  //   console.log("edit successful")
  //   let olddata = this.collections.find(c => c.collectionId == updateddata.collectionId)
  //   for (var o in olddata) {

  //     if (olddata.hasOwnProperty(o)) {

  //       for (var u in updateddata) {

  //         if (updateddata.hasOwnProperty(u)) {

  //           if (o == u) {

  //             olddata[o] = updateddata[u];
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}


