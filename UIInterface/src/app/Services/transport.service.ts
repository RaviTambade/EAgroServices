import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transport } from '../Models/transport';
import { TransportFaredetails } from '../Models/transportFaredetails';
import { TransportTruckdetails } from '../Models/transport-truckdetails';
import { Truck } from '../Models/truck';
import { TransportOrderCount } from '../Models/transport-order-count';


@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private httpClient: HttpClient) { }
  getTransport(transportId: any): Observable<any> {
    let url = "http://localhost:5240/api/Transports/" + transportId;
    return this.httpClient.get<Transport>(url);
  }

  updateTransport(transportId: any, transport: Transport): Observable<any> {
    let url = "http://localhost:5240/api/Transports/" + transportId;
    return this.httpClient.put<Transport>(url, transport);
  }

  deleteTransport(transportId: any): Observable<any> {
    let url = "http://localhost:5240/api/Transports/" + transportId;
    return this.httpClient.delete(url);
  }

  transportHistory(transportId: any): Observable<TransportFaredetails[]> {
    let url = "http://localhost:5240/api/Transports/"+transportId+"/history" ;
    return this.httpClient.get<TransportFaredetails[]>(url);
  }

  transportTrucktHistory(transportId: any): Observable<TransportTruckdetails[]> {
    let url = "http://localhost:5240/api/Transports/" + transportId+"/monthhistory";
    return this.httpClient.get<TransportTruckdetails[]>(url);
  }

  transportTrucktHistoryByYear(transportId: any): Observable<TransportTruckdetails[]> {
    let url = "http://localhost:5240/api/Transports/" + transportId+"/yearhistory";
    return this.httpClient.get<TransportTruckdetails[]>(url);
  }

  transportTruckOrdersPerMonth(transportId: any): Observable<TransportOrderCount[]> {
    let url = "http://localhost:5240/api/Transports/transport-truck-orders-per-month/" + transportId;
    return this.httpClient.get<TransportOrderCount[]>(url);
  };

  getAllTrucks(transportId: any): Observable<any> {
    let url = "http://localhost:5240/api/transports/trucks/" + transportId;
    return this.httpClient.get<any>(url);
  }

  addTruck(transportId: any, truck: Truck): Observable<any> {
    let url = "http://localhost:5240/api/truck/" + transportId;
    return this.httpClient.post<any>(url, truck);
  }

  updateTruck(truck: Truck): Observable<any> {
    let url = "http://localhost:5240/api/truck/" + truck.truckId;
    return this.httpClient.put<Truck>(url, truck)
  }
  DeleteTruck(truckId: number): Observable<any> {
    let url = "http://localhost:5240/api/truck/" + truckId;
    return this.httpClient.delete(url)
  }

}
