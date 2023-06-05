import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Collection } from 'src/app/Models/collection';
import { EmployeeService } from 'src/app/Services/employee.service';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collectionform',
  templateUrl: './collectionform.component.html',
  styleUrls: ['./collectionform.component.scss']
})
export class CollectionformComponent {
  collection: Collection= {
    farmerId: 3,
    cropId: 1,
    containerType: 'bags',
    quantity: 200,
    grade: 'A',
    totalWeight: 2000,
    tareWeight: 100,
    ratePerKg: 30
  }
  constructor(private svc: EmployeeService, private http: HttpClient) { }
  addNewCollection() {
    console.log(this.collection);
    this.svc.addCollection(this.collection)
  }
}
