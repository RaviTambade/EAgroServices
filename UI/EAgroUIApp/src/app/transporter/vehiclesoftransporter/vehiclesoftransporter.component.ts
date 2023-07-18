import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransporterService } from '../transporter.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehiclesoftransporter',
  templateUrl: './vehiclesoftransporter.component.html',
  styleUrls: ['./vehiclesoftransporter.component.css']
})
export class VehiclesoftransporterComponent implements OnInit {
  transporterId:number;
  vehicles:Vehicle[];
  subscription:Subscription;
  constructor(private svc:TransporterService,private router:Router){
    this.transporterId=1;
    this.vehicles=[];
    this.subscription=new Subscription();
  }
  ngOnInit(): void {
    this.transporterId = Number(localStorage.getItem("transporterId"));
    this.subscription=this.svc.getVehiclesOfTransporter(this.transporterId).subscribe((response)=>{
      this.vehicles=response;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  OnSelectGetShipment(vehicleId: number) {
    this.router.navigate(['/transporter', this.transporterId, 'shipments', vehicleId]);
  }
  onAddNewVehicle(){
    this.router.navigate(['transporter', this.transporterId, 'addvehicle']);
  }
}
