import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantShipment } from './merchant-shipment';
import { ShipmentItemDetails } from './shipment-item-details';
import { TransporterAmount } from './transporter-amount';
import { InprogressVehicle } from '../collectioncenter/inprogress-vehicle';
import { ShipmentItem } from '../collectioncenter/shipment-item';
import { ShipmentStatus } from './shipment-status';
import { ShippedCollection } from '../collectioncenter/shipped-collection';
import { FilterRequest } from '../Shared/filter/filter-request';

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
      "status": ShipmentStatus.delivered
    }
    let url = "http://localhost:5067/api/shipments/status/" + shipmentId;
    return this.http.patch<boolean>(url, obj);
  }

  getShipmentTransporterAmount(shipmentId: number): Observable<TransporterAmount> {
    let url = "http://localhost:5067/api/shipments/transporteramount/" + shipmentId;
    return this.http.get<TransporterAmount>(url);
  }

  addShipment(shipment: any): Observable<boolean> {
    let url = "http://localhost:5067/api/shipments"
    return this.http.post<boolean>(url, shipment)
  }

  getInprogressShipments(): Observable<InprogressVehicle[]> {
    let url = "http://localhost:5067/api/shipments/inprogress"
    return this.http.get<any>(url)
  }

  addShipmentItem(shipmentItem: ShipmentItem): Observable<boolean> {
    let url = "http://localhost:5067/api/shipmentitems";
    return this.http.post<boolean>(url, shipmentItem);
  }

  getShippedCollections(filterRequest:FilterRequest,pageNumber:number,staus:string):Observable<HttpResponse<any>>{
    const collectionCenterId = localStorage.getItem("collectionCenterId");
    let url = "http://localhost:5067/api/shipments/collections/"+collectionCenterId+"/status/"+staus;
    console.log("🚀 ~ getShippedCollections ~ url:", url);
    const params = new HttpParams().set('pageNumber', pageNumber.toString());
    return this.http.post<any>(url, filterRequest, { params: params, observe: 'response' });  
  }


}
