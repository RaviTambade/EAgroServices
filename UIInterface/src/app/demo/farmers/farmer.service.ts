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
  deleteFarmer(farmerId:any):Observable<any>{ 
    let url = "http://localhost:5141/api/farmers/delete/"+farmerId;
    return this.httpClient.delete<any>(url);
  }
  getFarmerRevenue(farmerId:string):Observable<any>{  //column chart
    let url =" http://localhost:5171/api/purchase/get-farmer-sell-total-amount-by-month/" +farmerId;
    return this.httpClient.get<Farmersell[]>(url);
  }
  updateFarmerDetails(farmerId:any,farmer:Farmer):Observable<any>{
    let url =" http://localhost:5141/api/farmers/update/" +farmerId;
    return this.httpClient.put<Farmer>(url,farmer);
  }
  getFarmerPurchaseDetails(farmerId:any):Observable<Purchaseviewmodel[]>{  
    let url =" http://localhost:5171/api/purchase/get-farmer-purchase-details/" +farmerId;
    return this.httpClient.get<Purchaseviewmodel[]>(url);
  }
  getAllVarieties():Observable<any>{
    let url = "http://localhost:5224/api/Variety/getall";
    return this.httpClient.get<Variety[]>(url);
  }
  getFarmerTotalAmont(farmerId:any):Observable<any>{ //totalAmount card
    let url = "http://localhost:5171/api/purchase/get-farmer-sell-total-amount/"+farmerId;
    return this.httpClient.get<number>(url);
  }

  getFarmerSellByVariety(farmerId:any):Observable<any>{  //pie chart
    let url = "http://localhost:5171/api/purchase/get-farmer-sell-by-variety/"+farmerId;
    return this.httpClient.get<Farmersellvariety[]>(url);
  }
  getFarmerOrdersPerMonth(farmerId:any):Observable<any>{ //area chart
    let url = "http://localhost:5171/api/purchase/get-farmer-orders-per-month/"+farmerId;
    return this.httpClient.get<Farmersellvariety[]>(url);
  }

}
