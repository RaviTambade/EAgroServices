import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NameId } from '../Models/name-id';
import { Observable } from 'rxjs';
import { Crop } from '../Models/crop';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private http: HttpClient) { }

  getCrops(): Observable<NameId[]> {
    let url = "http://localhost:5250/api/crops/nameswithid";
    return this.http.get<NameId[]>(url);
  }
  todaysRate(): Observable<Crop[]> {
    let url="http://localhost:5250/api/crops"
    return this.http.get<Crop[]>(url);
  }
}
