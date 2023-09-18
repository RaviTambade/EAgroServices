import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NameId } from '../Models/name-id';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private http: HttpClient) { }

  getCrops(): Observable<NameId[]> {
    let url = "http://localhost:5250/api/crops/nameswithid";
    return this.http.get<NameId[]>(url);
  }
}
