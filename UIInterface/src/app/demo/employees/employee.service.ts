import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Farmer } from '../farmers/farmer';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private subject=new Subject<any>();
// roles:any [] =[{
//   "roleName":"Admin",
//   "firstName":"Sahil"
// },
// {
//   "roleName":"Employee",
//   "firstName":"Shubham"
// },
// {
//   "roleName":"Merchant",
//   "firstName":"Jayesh"
// },
// {
//   "roleName":"Transport",
//   "firstName":"Rajesh"
// },
// {
//   "roleName":"Farmer",
//   "firstName":"Tejas"
// }
// ]

  constructor(private httpClient:HttpClient) { }
  getAllFarmers():Observable<any>{
    let url =" http://localhost:5141/api/farmers/getallfarmers";
    return this.httpClient.get<any>(url);
  }
  updateFarmer(farmerId:any,farmer:Farmer):Observable<any>{
    let url =" http://localhost:5141/api/farmers/update/" +farmerId;
    return this.httpClient.put<Farmer>(url,farmer);
  }
  getAllMerchants():Observable<any>{
    let url=" http://localhost:5188/api/merchants/getallmerchants";
    return this.httpClient.get<any>(url);
  }

  getAllTransport():Observable<any>{
    let url="http://localhost:5240/api/transports/getalltransports" ;
    return this.httpClient.get<any>(url);
  }

  getAllEmployee():Observable<any>{
    let url="http://localhost:5265/api/employees/getallemployees" ;
    return this.httpClient.get<any>(url);
  }
  getAllAdmin():Observable<any>{
    let url="http://localhost:5051/api/admins/getalladmins" ;
    return this.httpClient.get<any>(url);
  }

  
  sendRole(role:any){
    let data :any [];
    console.log("service is called")
    switch(role){
    
    case "Admin":{
      
      let data= this.getAllAdmin().subscribe((response)=>{
        console.log(response)
      });
      console.log(data)
      this.subject.next(data);
      console.log(data)
    }
    break;
    // case "Employee":   { 
    //     let url =" http://localhost:5141/api/farmers/getallfarmers";
    //     return this.httpClient.get<any>(url);
      
    //     this.subject.next(data);
    //   console.log(data)

    //   }
    //   break;
      case "Farmer":
              {
                let data :Observable<any>;
                  let url =" http://localhost:5141/api/farmers/getallfarmers";
                  data= this.httpClient.get<any[]>(url);

        this.subject.next(data);
      console.log(data)

      }
      break;
      case "Merchant":      {
        let data= this.getAllMerchants().subscribe((response)=>{
          console.log(response);
        });
        this.subject.next(data);
      }
      break;
      case "Transport":      {
        let data= this.getAllTransport().subscribe((response)=>{
          console.log(response);
        });
        this.subject.next(data);
      }
      break;

      default:
      break;
  }
}

  getData():Observable<any>{
    return this.subject.asObservable()
  }
}

