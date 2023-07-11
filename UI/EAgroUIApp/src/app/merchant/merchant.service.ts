import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private svc: HttpClient) { }

  getShipments(): Observable<any> {
    let url = "http://localhost:5067/api/shipments/merchant/1";
    return this.svc.get<any>(url);
  }

  getShipmentItems(shipmentId:number): Observable<any> {
    let url = "http://localhost:5067/api/shipments/shipmentitems/"+shipmentId;
    return this.svc.get<any>(url);
  }
}
