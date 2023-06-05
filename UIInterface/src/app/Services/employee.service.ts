import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Collection } from '../Models/collection';
import { Farmer } from '../Models/farmer';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private subject = new Subject<any>();


  constructor(private httpClient: HttpClient) { }
  addCollection(collection:Collection):Observable<any>{
    console.log(collection)
    console.log("f called")
        let url:"http://localhost:5031/api/collections" 
        return this.httpClient.post(url,collection)
  }
  getAllFarmers(): Observable<any> {
    let url = " http://localhost:5141/api/farmers/getallfarmers";
    return this.httpClient.get<any>(url);
  }
  updateFarmer(farmerId: any, farmer: Farmer): Observable<any> {
    let url = " http://localhost:5141/api/farmers/update/" + farmerId;
    return this.httpClient.put<Farmer>(url, farmer);
  }
  getAllMerchants(): Observable<any> {
    let url = " http://localhost:5188/api/merchants/getallmerchants";
    return this.httpClient.get<any>(url);
  }

  getAllTransport(): Observable<any> {
    let url = "http://localhost:5240/api/transports/getalltransports";
    return this.httpClient.get<any>(url);
  }

  getAllEmployee(): Observable<any> {
    let url = "http://localhost:5265/api/employees/getallemployees";
    return this.httpClient.get<any>(url);
  }
  getAllAdmin(): Observable<any> {
    let url = "http://localhost:5051/api/admins/getalladmins";
    return this.httpClient.get<any>(url);
  }


  sendRole(data: any) {
    let role=data.selectedRole;
    console.log("service is called")
    console.log(role)
    switch (role) {

      case "Admin": {
        let url = "http://localhost:5051/api/admins/getalladmins"
        this.httpClient.get(url).subscribe((data) => {
          this.subject.next({ data, role });
        });
      }
        break;
      case "Employee": {
        let url = " http://localhost:5265/api/employees/getallemployees";
        this.httpClient.get(url).subscribe((data) => {
          this.subject.next({ data, role });
        });
      }
        break;
      case "Farmer":
        console.log("farmer service called")
        let url = 'http://localhost:5141/api/farmers/getallfarmers';
        this.httpClient.get(url).subscribe((data) => {
          console.log(data)
          this.subject.next({ data, role });
        });

        break;
      case "Merchant": {
        let url = 'http://localhost:5188/api/merchants/getallmerchants';
        this.httpClient.get(url).subscribe((data) => {
          this.subject.next({ data, role });
        });
      }
        break;
      case "Transport": {
        let url = 'http://localhost:5240/api/transports/alltransports';
        this.httpClient.get(url).subscribe((data) => {
          this.subject.next({ data, role });
        });
      }
        break;

      default:
        break;
    }
  }

  getData(): Observable<any> {
    return this.subject.asObservable()
  }

 
}



