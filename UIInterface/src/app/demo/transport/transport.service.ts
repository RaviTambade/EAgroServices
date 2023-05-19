import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transport } from './transport';
import { TransportFaredetails } from './transportFaredetails';
import { TransportTruckdetails } from './transport-truckdetails';
import { Truck } from './truck';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private httpClient:HttpClient) { }
  getTransport(transportId:any):Observable<any>{
    let url="http://localhost:5240/api/Transports/getdetails/" +transportId;
    return this.httpClient.get<Transport>(url);
  }
  updateTransport(transportId:any,transport:Transport):Observable<any>{
    let url="http://localhost:5240/api/Transports/update/" +transportId;
    return this.httpClient.put<Transport>(url,transport);

  }
 transportHistory(transportId:any):Observable<TransportFaredetails[]>{
  let url ="http://localhost:5240/api/Transports/transport-history/" +transportId;
  return this.httpClient.get<TransportFaredetails[]>(url);
 }

 transportTrucktHistory(transportId:any):Observable<TransportTruckdetails[]>{
  let url ="http://localhost:5240/api/Transports/transport-truck-history-by-month/" +transportId;
  return this.httpClient.get<TransportTruckdetails[]>(url);
 }
 transportTrucktHistoryByYear(transportId:any):Observable<TransportTruckdetails[]>{
  let url ="http://localhost:5240/api/Transports/transport-truck-history-by-year/" +transportId;
  return this.httpClient.get<TransportTruckdetails[]>(url);
}
getAllTrucks(transportId:any):Observable<Truck[]>{
  let url ="http://localhost:5240/api/transports/transport-trucks/" +transportId;
  return this.httpClient.get<Truck[]>(url);
}
addTruck(truck:Truck):Observable<Truck>{
  let url="http://localhost:5240/api/truck/insert";
  return this.httpClient.post<Truck>(url,truck);
}
}
