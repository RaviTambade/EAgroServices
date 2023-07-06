import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Variety } from '../Models/variety';

@Injectable({
  providedIn: 'root'
})
export class VarietyService {

  constructor(private httpClient:HttpClient) { }

  getAllVarieties():Observable<any>{
    let url = "http://localhost:5224/api/Variety/getall";
    return this.httpClient.get<Variety[]>(url);
  }
}
