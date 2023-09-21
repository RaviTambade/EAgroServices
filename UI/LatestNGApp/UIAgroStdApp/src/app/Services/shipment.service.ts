import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
// import { MerchantShipment } from '../Models/merchant-shipment';
import { ShipmentItemDetails } from '../Models/shipment-item-details';
// import { TransporterAmount } from '../Models/transporter-amount';
// import { InprogressVehicle } from '../Models/inprogress-vehicle';
// import { ShipmentItem } from '../Models/shipment-item';
// import { FilterRequest } from '../Shared/filter/filter-request';
// import { ShipmentStatus } from '../Models/Enums/shipment-status';
// import { ShippedCollection } from '../Models/shipped-collection';
import { CorporateService } from './corporate.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  constructor(
    private http: HttpClient,
    private corporatesvc: CorporateService,
    private usersvc: UserService
  ) {}

 

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


  addShipment(shipment: any): Observable<boolean> {
    let url = 'http://localhost:5067/api/shipments';
    return this.http.post<boolean>(url, shipment);
  }

 
}
