import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Collection } from 'src/app/Models/collection';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-collectionform',
  templateUrl: './collectionform.component.html',
  styleUrls: ['./collectionform.component.scss']
})
export class CollectionformComponent {
  collection:Collection={
    farmerId: 3,
    cropId: 1,
    containerType: 'bags',
    quantity: 200,
    grade: 'A',
    totalWeight: 2000,
    tareWeight: 100,
    ratePerKg: 30
  }
  status :boolean=false;
  constructor(private svc:EmployeeService,private http:HttpClient){}
  addNewCollection(){
    // console.log(this.collection);
    // this.svc.addCollection(this.collection).subscribe((response)=>{
    //   console.log(response)
    // })

    console.log(this.collection)
    console.log("f called")
        let url:"http://localhost:5031/api/collections" 
        return this.http.post<Collection>(url,this.collection).subscribe((res)=>{
          console.log(res);
          console.log("response sent")
        })
  
  }
}
