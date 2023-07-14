import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
  let url = "http://localhost:5067/api/shipments/vehicles/" +vehicleId
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
}
