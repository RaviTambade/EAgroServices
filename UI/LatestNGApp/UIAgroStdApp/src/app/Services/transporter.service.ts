import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Vehicle } from '../Models/vehicle';
import { Shipmentsmerchant } from '../Models/shipmentsmerchant';

@Injectable({
  providedIn: 'root'
})
export class TransporterService {

  constructor(public httpClient: HttpClient) { }
  private selectedVehicleIdSubject = new BehaviorSubject<any>(null);
  selectedVehicleId$ = this.selectedVehicleIdSubject.asObservable();

  setSelectedvehicleId(vehicleId: number) {
    this.selectedVehicleIdSubject.next(vehicleId);
    console.log(vehicleId);
  }
  


  getVehiclesOfTransporter(transporterId:number): Observable<Vehicle[]> {
    let url = " http://localhost:5025/api/transporters/" + transporterId + "/vehicles"
    console.log(url);
   return this.httpClient.get<Vehicle[]>(url);
  }

  getCorporateIdOfTransporter(): Observable<number> {
    let transporterId=localStorage.getItem("userId")
    let url = "http://localhost:5025/api/transporters/corporateid/" + transporterId;
    return this.httpClient.get<number>(url);
  }

  gettransporterIdByUserId(): Observable<number> {
    let userId=localStorage.getItem("userId")
    let url = "http://localhost:5025/api/transporters/manager/" + userId;
    return this.httpClient.get<number>(url);
  }

  getShipmentsOfVehicle(vehicleId: number): Observable<Shipmentsmerchant[]> {
    let url = "http://localhost:5067/api/shipments/vehicles/" + vehicleId
    return this.httpClient.get<Shipmentsmerchant[]>(url)
      
    }
  }