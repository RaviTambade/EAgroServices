import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transport } from './transport';
import { Transportdetails } from './transportdetails';

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
 transportHistory(transportId:any):Observable<any>{
  let url ="http://localhost:5240/api/Transports/transporthistory/" +transportId;
  return this.httpClient.get<Transportdetails[]>(url);
 }
}
