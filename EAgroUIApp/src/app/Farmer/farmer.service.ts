import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Farmer } from './farmer';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private httpClient:HttpClient) { }
 GetDetails(farmerId:number):Observable<any>{
      let url ="http://localhost:5141/api/farmers/getdetails/"+farmerId;
      return this.httpClient.get<Farmer>(url);
      }
}
