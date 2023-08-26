import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MerchantShipment } from '../Models/merchant-shipment';
import { ShipmentItemDetails } from '../Models/shipment-item-details';
import { TransporterAmount } from '../Models/transporter-amount';
import { InprogressVehicle } from '../Models/inprogress-vehicle';
import { ShipmentItem } from '../Models/shipment-item';
import { FilterRequest } from '../Shared/filter/filter-request';
import { ShipmentStatus } from '../Models/Enums/shipment-status';
import { ShippedCollection } from '../Models/shipped-collection';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  constructor(private http: HttpClient) {}

  getInprogressShipmentsByMerchant(): Observable<MerchantShipment[]> {
    const merchantId = localStorage.getItem('merchantId');
    let url =
      'http://localhost:5067/api/shipments/inprogress/merchant/' + merchantId;
    return this.http.get<MerchantShipment[]>(url);
  }
  getDeliveredShipmentByMerchant(
    paymentStatus: string
  ): Observable<MerchantShipment[]> {
    const merchantId = localStorage.getItem('merchantId');
    let url =
      'http://localhost:5067/api/shipments/delivered/merchant/' +
      merchantId +
      '/' +
      paymentStatus;
    return this.http.get<MerchantShipment[]>(url);
  }

  getShipmentItems(shipmentId: number): Observable<ShipmentItemDetails[]> {
    let url = 'http://localhost:5067/api/shipments/shipmentitems/' + shipmentId;
    return this.http.get<ShipmentItemDetails[]>(url);
  }

  removeShipmentItem(shipmentItemId: number): Observable<boolean> {
    let url = 'http://localhost:5067/api/shipmentItems/' + shipmentItemId;
    return this.http.delete<boolean>(url);
  }

  isShipmentStatusDelivered(shipmentId: number): Observable<boolean> {
    let url = 'http://localhost:5067/api/shipments/status/' + shipmentId;
    return this.http.get<boolean>(url);
  }

  updateShipmentStatus(shipmentId: number): Observable<boolean> {
    let obj = {
      status: ShipmentStatus.delivered,
    };
    let url = 'http://localhost:5067/api/shipments/status/' + shipmentId;
    return this.http.patch<boolean>(url, obj);
  }

  getShipmentTransporterAmount(
    shipmentId: number
  ): Observable<TransporterAmount> {
    let url =
      'http://localhost:5067/api/shipments/transporteramount/' + shipmentId;
    return this.http.get<TransporterAmount>(url);
  }

  addShipment(shipment: any): Observable<boolean> {
    let url = 'http://localhost:5067/api/shipments';
    return this.http.post<boolean>(url, shipment);
  }

  getInprogressShipments(): Observable<InprogressVehicle[]> {
    let url = 'http://localhost:5067/api/shipments/inprogress';
    return this.http.get<any>(url);
  }

  addShipmentItem(shipmentItem: ShipmentItem): Observable<boolean> {
    let url = 'http://localhost:5067/api/shipmentitems';
    return this.http.post<boolean>(url, shipmentItem);
  }

  getShippedCollections(
    filterRequest: FilterRequest,
    pageNumber: number,
    staus: string
  ): Observable<HttpResponse<ShippedCollection[]>> {
    let collectionCenterId = localStorage.getItem('collectionCenterId');
    let url =
      'http://localhost:5067/api/shipments/collections/' +
      collectionCenterId +
      '/status/' +
      staus;
    let params = new HttpParams().set('pageNumber', pageNumber.toString());
    return this.http.post<ShippedCollection[]>(url, filterRequest, {
      params: params,
      observe: 'response',
    });
  }
}