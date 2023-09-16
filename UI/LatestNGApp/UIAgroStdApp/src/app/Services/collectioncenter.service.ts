import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectioncenterService {
  constructor(private http: HttpClient) {}
 

  // getCorporateIdByCollectionCenterId(): Observable<number> {
  //   let collectionCenterId = localStorage.getItem('collectionCenterId');
  //   let url =
  //     'http://localhost:5192/api/collectioncenters/corporateid/' +
  //     collectionCenterId;
  //   return this.http.get<number>(url);
  // }


}
