import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Vehicle } from '../Models/vehicle';
import { Shipmentsmerchant } from '../Models/shipmentsmerchant';
import { VehicleNumberId } from '../Models/vehiclenumberid';
import { Corporate } from '../Models/corporate';
import { VehicleCorporateShipment } from '../Models/vehicle-corporate-shipment';
import { Transporterinvoice } from '../Models/transporterinvoices';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TransporterService {

  constructor(public httpClient: HttpClient,public authService:AuthenticationService) { }
  private selectedVehicleIdSubject = new BehaviorSubject<any>(null)
  selectedVehicleId$ = this.selectedVehicleIdSubject.asObservable();

  setSelectedvehicleId(vehicleId: number) {
    this.selectedVehicleIdSubject.next(vehicleId);
    console.log(vehicleId);
  }
  

  private selectedShipmentIdSubject = new BehaviorSubject<any>(null);
  selectedShipmentId$ = this.selectedShipmentIdSubject.asObservable();

  setSelectedShipmentId(shipmentId: number) {
    this.selectedShipmentIdSubject.next(shipmentId);  
    console.log("Details ", shipmentId);
  }


  getVehiclesOfTransporter(transporterId:number): Observable<Vehicle[]> {
    let url = " http://localhost:5025/api/transporters/" + transporterId + "/vehicles"
    console.log(url);
   return this.httpClient.get<Vehicle[]>(url);
  }

  getCorporateIdOfTransporter(transporterId:number): Observable<number> {
    let url = "http://localhost:5025/api/transporters/corporateid/" + transporterId;
    return this.httpClient.get<number>(url);
  }

  gettransporterIdByUserId(): Observable<number> {
    const userId=this.authService.getNameIdFromToken();
    let url = "http://localhost:5025/api/transporters/manager/" + userId;
    return this.httpClient.get<number>(url);
    
  }

  getShipmentsOfVehicle(vehicleId: number): Observable<Shipmentsmerchant[]> {
    let url = "http://localhost:5067/api/shipments/vehicles/" + vehicleId
    return this.httpClient.get<Shipmentsmerchant[]>(url)
      
    }
    getAllShipmentsOfTransporter(transporterId: number): Observable<VehicleCorporateShipment[]> {
      let url = "http://localhost:5067/api/shipments/transporter/" + transporterId
      return this.httpClient.get<VehicleCorporateShipment[]>(url)
    }

    getTransporterInvoices(paymentStatus:string,transporterId:number):Observable<Transporterinvoice[]>{
      let url="http://localhost:5025/api/transporters/" + transporterId + "/invoices/" +paymentStatus
      return this.httpClient.get<Transporterinvoice[]>(url);
    }
    getVehicleNumbers(): Observable<VehicleNumberId[]> {
      let url = "http://localhost:5261/api/vehicles/availabelvehicles"
      return this.httpClient.get<VehicleNumberId[]>(url)
    }
  }
  