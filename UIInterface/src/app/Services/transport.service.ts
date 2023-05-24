import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transport } from '../Models/transport';
import { TransportFaredetails } from '../Models/transportFaredetails';
import { TransportTruckdetails } from '../Models/transport-truckdetails';
import { Truck } from '../Models/truck';


@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private httpClient: HttpClient) { }
  getTransport(transportId: any): Observable<any> {
    let url = "http://localhost:5240/api/Transports/getdetails/" + transportId;
    return this.httpClient.get<Transport>(url);
  }
  updateTransport(transportId: any, transport: Transport): Observable<any> {
    let url = "http://localhost:5240/api/Transports/update/" + transportId;
    return this.httpClient.put<Transport>(url, transport);

  }
  deleteTransport(transportId: any): Observable<any> {
    let url = "http://localhost:5240/api/Transports/delete/" + transportId;
    return this.httpClient.delete(url);
  }
  transportHistory(transportId: any): Observable<TransportFaredetails[]> {
    let url = "http://localhost:5240/api/Transports/transport-history/" + transportId;
    return this.httpClient.get<TransportFaredetails[]>(url);
  }

  transportTrucktHistory(transportId: any): Observable<TransportTruckdetails[]> {
    let url = "http://localhost:5240/api/Transports/transport-truck-history-by-month/" + transportId;
    return this.httpClient.get<TransportTruckdetails[]>(url);
  }
  transportTrucktHistoryByYear(transportId: any): Observable<TransportTruckdetails[]> {
    let url = "http://localhost:5240/api/Transports/transport-truck-history-by-year/" + transportId;
    return this.httpClient.get<TransportTruckdetails[]>(url);
  }
  getAllTrucks(transportId: any): Observable<any> {
    let url = "http://localhost:5240/api/transports/transport-trucks/" + transportId;
    return this.httpClient.get<any>(url);
  }
  addTruck(transportId: any, truck: Truck): Observable<any> {
    let url = "http://localhost:5240/api/truck/insert/" + transportId;
    return this.httpClient.post<any>(url, truck);
  }

  updateTruck(truck: Truck): Observable<any> {
    let url = "http://localhost:5240/api/truck/update/" + truck.truckId;
    return this.httpClient.put<Truck>(url, truck)
  }
  DeleteTruck(truckId: number): Observable<any> {
    let url = "http://localhost:5240/api/truck/delete/" + truckId;
    return this.httpClient.delete(url)
  }
}
