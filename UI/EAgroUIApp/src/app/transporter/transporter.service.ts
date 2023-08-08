import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Vehicle } from './vehicle';
import { Transporter } from './transporter';
import { Vehiclenumberid } from './vehiclenumberid';
import { Vehiclerevenue } from './vehiclerevenue';
import { Transporterrevenue } from './transporterrevenue';
import { Shipmentcount } from './shipmentcount';
import { Corporate } from '../corporate';
import { verifyHostBindings } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TransporterService {
  private vehicleSubject: Subject<any[]> = new Subject<any[]>();
  private shipmentSubject: Subject<any[]> = new Subject<any[]>();

  constructor(public httpClient: HttpClient) { }
  getVehiclesOfTransporter(transporterId: number): Observable<any> {
    let url = " http://localhost:5025/api/transporters/" + transporterId + "/vehicles"
    this.httpClient.get<any[]>(url).subscribe(
      (response) => {
        this.vehicleSubject.next(response);
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
    return this.vehicleSubject.asObservable();
  }
 getShipmentsOfVehicle(vehicleId:number):Observable<any>{
  let url = "http://localhost:5067/api/shipments/vehicles/" + vehicleId
  this.httpClient.get<any[]>(url).subscribe(
    (response) => {
      this.shipmentSubject.next(response);
    },
    (error) => {
      console.log('Error occurred:', error);
    }
  );
  return this.shipmentSubject.asObservable();
 }

//  getCorporateId(merchantId:number):Observable<any>{
//   let url="http://localhost:5276/api/merchants/" + merchantId + "/getcorporate"
//   return this.httpClient.get<any>(url)
//  }


getTransporterAndCorporateId(): Observable<Corporate[]> {
  let url = "http://localhost:5025/api/transporters/transporterandcorporateid";
  return this.httpClient.get<any>(url);
}

 addVehicle(vehicle:Vehicle):Observable<any>{
  let url="http://localhost:5261/api/vehicles"
  return this.httpClient.post<any>(url,vehicle)
 }

 addTransporter(transport:Transporter):Observable<any>{
  let url="http://localhost:5025/api/transporters"
  return this.httpClient.post<any>(url,transport)
 }

 getCorporateIdOfTransporter(transporterId:number): Observable<number> {
  let url = "http://localhost:5025/api/transporters/corporateid/" + transporterId;
  return this.httpClient.get<number>(url);
}

gettransporterIdByUserId(userId:number):Observable<number>{
  let url="http://localhost:5025/api/transporters/manager/"+userId;
  return this.httpClient.get<number>(url); 
}
getAllShipmentsOfTransporter(transporterId:number):Observable<any>{
  let url="http://localhost:5067/api/shipments/transporter/" +transporterId
  return this.httpClient.get<any>(url)
}
getVehicleNumbers():Observable<Vehiclenumberid[]>{
  let url="http://localhost:5261/api/vehicles/numbers"
  return this.httpClient.get<Vehiclenumberid[]>(url)
}
getVehicleRevenues(transporterId:number):Observable<Vehiclerevenue[]>{
  let url="http://localhost:5025/api/transporters/" + transporterId + "/revenues"
  return this.httpClient.get<Vehiclerevenue[]>(url)
}
getTransporterRevenue(transporterId:number):Observable<Transporterrevenue[]>{
  let url="http://localhost:5025/api/transporters/" +transporterId + "/monthlyrevenue"
  return this.httpClient.get<Transporterrevenue[]>(url)
}
getShipmentsCount(transporterId:number):Observable<Shipmentcount[]>{
  let url="http://localhost:5025/api/transporters/" + transporterId + "/shipmentcount"
  return this.httpClient.get<Shipmentcount[]>(url)
}
updateVehicle(vehicleId:number,vehicle:Vehicle):Observable<any>{
  let url=" http://localhost:5261/api/vehicles/" +vehicleId
  return this.httpClient.put<any>(url,vehicle)
}
getVehicle(vehicleId:number):Observable<any>{
  let url=" http://localhost:5261/api/vehicles/" +vehicleId
  return this.httpClient.get<any>(url)
}
}
