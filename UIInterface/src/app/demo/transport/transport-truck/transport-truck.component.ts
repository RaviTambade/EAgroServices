import { Component } from '@angular/core';
import { TransportService } from '../../../Services/transport.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Truck } from 'src/app/Models/truck';

@Component({
  selector: 'app-transport-truck',
  templateUrl: './transport-truck.component.html',
  styleUrls: ['./transport-truck.component.scss']
})
export class TransportTruckComponent {
  truck:Truck={
    truckNumber: ''
  };
  trucks:any ;
  transportId:any |undefined;
  status:boolean=false;
  constructor(private svc:TransportService,private route:ActivatedRoute,private authSvc:AuthService,){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
    this.svc.getAllTrucks(this.transportId).subscribe((response)=>{
      this.trucks=response
      console.log(response)
    });
  }
  addTruck(){
    const transportId = this.transportId;
    this.svc.addTruck(transportId, this.truck).subscribe((response) => {
      console.log(response);
      alert("Truck Inserted Successfully");
      window.location.reload();
    })
  }
 
  }


