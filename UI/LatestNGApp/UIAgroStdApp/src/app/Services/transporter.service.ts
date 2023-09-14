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

  getCorporateIdOfTransporter(): Observable<number> {
    let transporterId=localStorage.getItem("transporterId")
    let url = "http://localhost:5025/api/transporters/corporateid/" + transporterId;
    return this.httpClient.get<number>(url);
  }

  gettransporterIdByUserId(userId: number): Observable<number> {
    let url = "http://localhost:5025/api/transporters/manager/" + userId;
    return this.httpClient.get<number>(url);
  }

}
