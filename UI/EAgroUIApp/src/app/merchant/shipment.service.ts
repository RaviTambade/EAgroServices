import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipment } from '../transporter/shipment';
import { MerchantShipment } from './merchant-shipment';
import { ShipmentItemDetails } from './shipment-item-details';
import { TransporterAmount } from './transporter-amount';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }

  getShipments(status: string): Observable<MerchantShipment[]> {
    let merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5067/api/shipments/merchant/" + merchantId + "/status/" + status;
    return this.http.get<MerchantShipment[]>(url);
  }

  getShipmentItems(shipmentId: number): Observable<ShipmentItemDetails[]> {
    let url = "http://localhost:5067/api/shipments/shipmentitems/" + shipmentId;
    return this.http.get<ShipmentItemDetails[]>(url);
  }

  removeShipmentItem(shipmentItemId: number): Observable<boolean> {
    let url = "http://localhost:5067/api/shipmentItems/" + shipmentItemId;
    return this.http.delete<boolean>(url);
  }

  isShipmentStatusDelivered(shipmentId: number): Observable<boolean> {
    let url = "http://localhost:5067/api/shipments/status/" + shipmentId;
    return this.http.get<boolean>(url);
  }

  updateShipmentStatus(shipmentId: number): Observable<boolean> {
    let obj = {
      "status": "delivered"
    }
    let url = "http://localhost:5067/api/shipments/status/" + shipmentId;
    return this.http.patch<boolean>(url, obj);
  }

  getShipmentTransporterAmount(shipmentId: number): Observable<TransporterAmount> {
    let url = "http://localhost:5067/api/shipments/transporteramount/" + shipmentId;
    return this.http.get<TransporterAmount>(url);
  }

  addShipment(shipment:Shipment):Observable<any>{
    let url="http://localhost:5067/api/shipments"
    return this.http.post<any>(url,shipment)
  }
}
