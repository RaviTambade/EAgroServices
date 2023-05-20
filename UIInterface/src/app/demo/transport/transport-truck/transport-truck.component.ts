import { Component } from '@angular/core';
import { TransportService } from '../../../Services/transport.service';
import { ActivatedRoute } from '@angular/router';
import { Truck } from '../truck';

@Component({
  selector: 'app-transport-truck',
  templateUrl: './transport-truck.component.html',
  styleUrls: ['./transport-truck.component.scss']
})
export class TransportTruckComponent {
  truck:Truck|any
  transportId: string;
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
  addTruck(truck:Truck){
    this.svc.addTruck(this.truck).subscribe((response)=>{
this.truck=response
console.log(this.truck);
    })
  }
 
  }


