import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Corporate } from '../Models/corporate';
import { Transporter } from '../Models/transporter';
import { Vehicle } from '../Models/vehicle';
import { VehicleNumberId } from '../Models/vehiclenumberid';
import { Transporterrevenue } from '../Models/transporterrevenue';
import { Shipmentcount } from '../Models/shipmentcount';
import { Vehiclerevenue } from '../Models/vehiclerevenue';
import { YearRevenue } from '../Models/year-revenue';
import { MonthRevenue } from '../Models/month-revenue';
import { QuarterRevenue } from '../Models/quarter-revenue';
import { WeekRevenue } from '../Models/week-revenue';
import { Transporterinvoice } from '../Models/transporterinvoice';
import { Shipmentsmerchant } from '../Models/shipmentsmerchant';
import { VehicleCorporateShipment } from '../Models/vehicle-corporate-shipment';


@Injectable({
  providedIn: 'root'
})
export class TransporterService {
  private vehicleSubject: Subject<any[]> = new Subject<any[]>();
  private shipmentSubject: Subject<any[]> = new Subject<any[]>();

  constructor(public httpClient: HttpClient) { }

  getVehiclesOfTransporter(transporterId: number): Observable<Vehicle[]> {
    let url = " http://localhost:5025/api/transporters/" + transporterId + "/vehicles"
    this.httpClient.get<Vehicle[]>(url).subscribe(
      (response) => {
        this.vehicleSubject.next(response);
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
    return this.vehicleSubject.asObservable();
  }

  getShipmentsOfVehicle(vehicleId: number): Observable<Shipmentsmerchant[]> {
    let url = "http://localhost:5067/api/shipments/vehicles/" + vehicleId
    this.httpClient.get<Shipmentsmerchant[]>(url).subscribe(
      (response) => {
        this.shipmentSubject.next(response);
      },
      (error) => {
        console.log('Error occurred:', error);
      }
    );
    return this.shipmentSubject.asObservable();
  }

  getTransporterAndCorporateId(): Observable<Corporate[]> {
    let url = "http://localhost:5025/api/transporters/transporterandcorporateid";
    return this.httpClient.get<Corporate[]>(url);
  }

  addVehicle(vehicle: Vehicle): Observable<boolean> {
    let url = "http://localhost:5261/api/vehicles"
    return this.httpClient.post<boolean>(url, vehicle)
  }

  addTransporter(transport: Transporter): Observable<boolean> {
    let url = "http://localhost:5025/api/transporters"
    return this.httpClient.post<boolean>(url, transport)
  }

  getCorporateIdOfTransporter(): Observable<number> {
    let transporterId=localStorage.getItem("transporterId")
    let url = "http://localhost:5025/api/transporters/corporateid/" + transporterId;
    return this.httpClient.get<number>(url);
  }

  gettransporterIdByUserId(userId: number): Observable<number> {
    let url = "http://localhost:5025/api/transporters/manager/" + userId;
    return this.httpClient.get<number>(url);
  }
  getAllShipmentsOfTransporter(transporterId: number): Observable<VehicleCorporateShipment[]> {
    let url = "http://localhost:5067/api/shipments/transporter/" + transporterId
    return this.httpClient.get<VehicleCorporateShipment[]>(url)
  }
  getVehicleNumbers(): Observable<VehicleNumberId[]> {
    let url = "http://localhost:5261/api/vehicles/availabelvehicles"
    return this.httpClient.get<VehicleNumberId[]>(url)
  }
  getTransporterRevenue(transporterId: number): Observable<Transporterrevenue[]> {
    let url = "http://localhost:5025/api/transporters/" + transporterId + "/monthlyrevenue"
    return this.httpClient.get<Transporterrevenue[]>(url)
  }
  getShipmentsCount(transporterId: number): Observable<Shipmentcount[]> {
    let url = "http://localhost:5025/api/transporters/" + transporterId + "/shipmentcount"
    return this.httpClient.get<Shipmentcount[]>(url)
  }
  updateVehicle(vehicleId: number, vehicle: Vehicle): Observable<boolean> {
    let url = " http://localhost:5261/api/vehicles/" + vehicleId
    return this.httpClient.put<boolean>(url, vehicle)
  }
  getVehicle(vehicleId: number): Observable<Vehicle> {
    let url = " http://localhost:5261/api/vehicles/" + vehicleId
    return this.httpClient.get<Vehicle>(url)
  }
  getYears(transporterId: number): Observable<string[]> {
    let url = "http://localhost:5235/api/transporterbi/years/" + transporterId
    return this.httpClient.get<string[]>(url)
  }
  getVehicleRevenues(transporterId: number, year: number): Observable<Vehiclerevenue[]> {
    let url = "http://localhost:5235/api/TransporterBI/revenue/year/" + transporterId + "/" + year
    return this.httpClient.get<Vehiclerevenue[]>(url)
  }
  getRevenueByYear(): Observable<YearRevenue[]> {
   let transporterId = Number(localStorage.getItem("transporterId"));
    let url = "http://localhost:5235/api/TransporterBI/revenue/year/" + transporterId
    return this.httpClient.get<YearRevenue[]>(url)
  }
  getRevenueByMonth(year:number):Observable<MonthRevenue[]>{
    let transporterId = Number(localStorage.getItem("transporterId"));
    let url="http://localhost:5235/api/TransporterBI/revenue/month/" + transporterId +"/" +year
    return this.httpClient.get<MonthRevenue[]>(url)
  }
  getRevenueByQuarter(year:number):Observable<QuarterRevenue[]>{
    let transporterId = Number(localStorage.getItem("transporterId"));
    let url="http://localhost:5235/api/TransporterBI/revenue/quarter/" + transporterId +"/" +year
    return this.httpClient.get<QuarterRevenue[]>(url)
  }
  getRevenueByWeek(year:number):Observable<WeekRevenue[]>{
    let transporterId = Number(localStorage.getItem("transporterId"));
    let url="http://localhost:5235/api/TransporterBI/revenue/week/" + transporterId +"/" +year
    return this.httpClient.get<WeekRevenue[]>(url)
  }

  getTransporterInvoices(paymentStatus:string):Observable<Transporterinvoice[]>{
    let transporterId = Number(localStorage.getItem("transporterId"));
    let url="http://localhost:5025/api/transporters/" + transporterId + "/invoices/" +paymentStatus
    return this.httpClient.get<Transporterinvoice[]>(url);
  }
  
}
