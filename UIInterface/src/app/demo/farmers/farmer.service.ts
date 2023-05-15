import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmer } from './farmer';
import { Farmersell } from './farmersell';
import { Purchaseviewmodel } from './purchaseviewmodel';
import { Variety } from './variety';
import { Farmersellvariety } from './farmersellvariety';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private httpClient:HttpClient) { }
  getFarmer(farmerId:string):Observable<any>{
    let url =" http://localhost:5141/api/farmers/getdetails/" +farmerId;
    return this.httpClient.get<Farmer>(url);
  }
  getFarmerRevenue(farmerId:string):Observable<any>{
    let url =" http://localhost:5171/api/purchase/getfarmerselltotalamountbymonth/" +farmerId;
    return this.httpClient.get<Farmersell[]>(url);
  }
  updateFarmerDetails(farmerId:any,farmer:Farmer):Observable<any>{
    let url =" http://localhost:5141/api/farmers/update/" +farmerId;
    return this.httpClient.put<Farmer>(url,farmer);
  }
  getFarmerPurchaseDetails(farmerId:any):Observable<any>{
    let url =" http://localhost:5171/api/purchase/GetFarmerPurchaseDetails/" +farmerId;
    return this.httpClient.get<Purchaseviewmodel[]>(url);
  }
  getAllVarieties():Observable<any>{
    let url = "http://localhost:5224/api/Variety/getall";
    return this.httpClient.get<Variety[]>(url);
  }
  getFarmerTotalAmont(farmerId:any):Observable<any>{
    let url = "http://localhost:5171/api/purchase/getfarmerselltotalamount/"+farmerId;
    return this.httpClient.get<number>(url);
  }

  getFarmerSellByVariety(farmerId:any):Observable<any>{
    let url = "http://localhost:5171/api/purchase/getfarmersellbyvariety/"+farmerId;
    return this.httpClient.get<Farmersellvariety[]>(url);
  }

}
