import { Component, NgModule, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Farmer } from '../../farmers/farmer';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class FarmersdetailsComponentModule { }
@Component({
  selector: 'app-farmersdetails',
  templateUrl: './farmersdetails.component.html',
  styleUrls: ['./farmersdetails.component.scss']
})
export class FarmersdetailsComponent implements OnInit {

  farmers: Farmer[] | any ;

  constructor(private svc: EmployeeService){}

   ngOnInit(): void {
  this.svc.getAllFarmers().subscribe((response) => {
    this.farmers=response
    console.log(this.farmers);
  })
}
}
