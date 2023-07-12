import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private svc: HttpClient) { }

  getShipments(): Observable<any> {
    let url = "http://localhost:5067/api/shipments/merchant/1";
    return this.svc.get<any>(url);
  }

  getShipmentItems(shipmentId: number): Observable<any> {
    let url = "http://localhost:5067/api/shipments/shipmentitems/" + shipmentId;
    return this.svc.get<any>(url);
  }

  removeShipmentItem(shipmentItemId: number): Observable<any> {
    let url = "http://localhost:5067/api/shipmentItems/" + shipmentItemId;
    return this.svc.delete(url);
  }

  getShipmentStatus(shipmentId: number): Observable<any> {
    let url = "http://localhost:5067/api/shipments/status/" + shipmentId;
    return this.svc.get(url);
  }

  updateShipmentStatus(shipmentId:number){
    const obj={
      "status":"delivered"
    }
    let url = "http://localhost:5067/api/shipments/status/" + shipmentId;
    return this.svc.patch(url,obj);
  }
}
