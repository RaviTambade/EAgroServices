import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NameId } from './name-id';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private http: HttpClient) { }

  getCrops(): Observable<NameId[]> {
    let url = "http://localhost:5250/api/crops/names";
    return this.http.get<NameId[]>(url);
  }
}
