import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { ShipmentItemDetails } from '../Models/shipment-item-details';
import { CorporateService } from './corporate.service';
import { UserService } from './user.service';
import { InprogressVehicle } from '../Models/inprogress-vehicle';
import { ShipmentItem } from '../Models/shipment-item';
import { FilterRequest } from '../filter/filter-request';
import { ShippedCollection } from '../Models/shipped-collection';
import { TransporterAmount } from '../Models/transporter-amount';
import { ShipmentStatus } from '../Models/Enum/shipmentStatus';
import { MerchantShipment } from '../Models/merchant-shipment';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  constructor(
    private http: HttpClient,
    private corporatesvc: CorporateService,
    private usersvc: UserService
  ) {}


  getmerchantIdByUserId(): Observable<number> {
    const userId = localStorage.getItem('userId');
    let url = "http://localhost:5276/api/merchants/manager/ " + userId;
    return this.http.get<number>(url);
  }

  getIdOfMerchant(corporateId: number): Observable<number> {
    let url = "http://localhost:5276/api/merchants/id/" + corporateId
    return this.http.get<number>(url)
  }

  getInprogressShipmentsByMerchant(merchantId:number): Observable<MerchantShipment[]> {
    let url ='http://localhost:5067/api/shipments/inprogress/merchant/' + merchantId;
    return this.http.get<MerchantShipment[]>(url);
  }

 



  getDeliveredShipmentByMerchant(
    merchantId:number,
    paymentStatus: string
  ): Observable<MerchantShipment[]> {
    let url =
      'http://localhost:5067/api/shipments/delivered/merchant/' +
      merchantId +
      '/' +
      paymentStatus;
    return this.http.get<MerchantShipment[]>(url);
  }

  getShipmentItems(shipmentId: number): Observable<ShipmentItemDetails[]> {
    let url = 'http://localhost:5067/api/shipments/shipmentitems/' + shipmentId;
  
    return this.http.get<ShipmentItemDetails[]>(url).pipe(
      switchMap((shipmentItemsDetails) => {
        if (shipmentItemsDetails.length === 0) {
          return of([]); 
        }
  
        const collectionCenterIds = new Set<number>();
        const farmerIds = new Set<number>();
  
        shipmentItemsDetails.forEach((item) => {
          collectionCenterIds.add(item.collectionCenterCorporaterId);
          farmerIds.add(item.farmerId);
        });
  
        const collectionCenterIdString = Array.from(collectionCenterIds).join(',');
        const farmerIdString = Array.from(farmerIds).join(',');
  
        const corporations$ = this.corporatesvc.getCorporates(collectionCenterIdString);
        const farmers$ = this.usersvc.getUserNamesWithId(farmerIdString);
  
        return forkJoin([corporations$, farmers$]).pipe(
          map(([corporationNames, farmerNames]) => {
            shipmentItemsDetails.forEach((item) => {
              const matchingCorporation = corporationNames.find(
                (element) => element.id === item.collectionCenterCorporaterId
              );
              if (matchingCorporation) {
                item.collectionCenterName = matchingCorporation.name;
              }
  
              const matchingFarmer = farmerNames.find(
                (element) => element.id === item.farmerId
              );
              if (matchingFarmer) {
                item.farmerName = matchingFarmer.name;
              }
            });
            return shipmentItemsDetails;
          })
        );
      })
    );
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

  getShippedCollectionsByStatus( collectionCenterId:number,
    staus:string):Observable<ShippedCollection[]>{
      let url =
      'http://localhost:5067/api/shipments/' +
      collectionCenterId +
      '/status/' +
      staus;
      console.log(url);
      return this.http.get<ShippedCollection[]>(url);
  }
  }

