import { Component, OnInit } from '@angular/core';
import { Farmer } from '../farmer';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  farmer:Farmer | undefined;
  farmerId :number  |undefined;
  constructor(private svc:FarmerService){}
  ngOnInit(): void {
    if(this.farmerId!=undefined){
    this.svc.getFarmer(this.farmerId).subscribe((response)=>{
       this.farmer=response;
       console.log(response);
       var farmer=localStorage.getItem('jwt');
       

    })
  }
}

}
