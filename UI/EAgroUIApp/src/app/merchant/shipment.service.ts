import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }

  getShipments(): Observable<any> {
    let url = "http://localhost:5067/api/shipments/merchant/1";
    return this.http.get<any>(url);
  }

  getShipmentItems(shipmentId: number): Observable<any> {
    let url = "http://localhost:5067/api/shipments/shipmentitems/" + shipmentId;
    return this.http.get<any>(url);
  }

  removeShipmentItem(shipmentItemId: number): Observable<any> {
    let url = "http://localhost:5067/api/shipmentItems/" + shipmentItemId;
    return this.http.delete(url);
  }

  getShipmentStatus(shipmentId: number): Observable<any> {
    let url = "http://localhost:5067/api/shipments/status/" + shipmentId;
    return this.http.get(url);
  }

  updateShipmentStatus(shipmentId:number){
    const obj={
      "status":"delivered"
    }
    let url = "http://localhost:5067/api/shipments/status/" + shipmentId;
    return this.http.patch(url,obj);
  }
}
