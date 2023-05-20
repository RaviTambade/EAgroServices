import { Component } from '@angular/core';
import { TransportService } from '../transport.service';
import { ActivatedRoute } from '@angular/router';
import { Truck } from '../truck';

@Component({
  selector: 'app-transport-truck',
  templateUrl: './transport-truck.component.html',
  styleUrls: ['./transport-truck.component.scss']
})
export class TransportTruckComponent {
  truck:Truck|any;
  transportId:any |undefined;
  status:boolean=false;
  constructor(private svc:TransportService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
    this.svc.getAllTrucks(this.transportId).subscribe((response)=>{
      this.truck=response
      console.log(response)
    });
  }
  addTruck(){
    // this.truck.transportId=this.transportId
    console.log(this.transportId)
    this.svc.addTruck(1,this.truck).subscribe((response)=>{
console.log(response)
alert("Truck Inserted Successfully")
 window.location.reload();
    })
  }
 
  }


