import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/Models/vehicle';
import { TransporterService } from 'src/app/Services/transporter.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  selectedVehicleId: string | null = null; 
  vehicles: Vehicle[]=[];
  subscription: Subscription;
  constructor(private transportersvc: TransporterService,
    private router: Router) {
    this.subscription = new Subscription();
  }
  ngOnInit(): void {
    this.transportersvc.gettransporterIdByUserId().subscribe((transporterId)=>{
      this.transportersvc.getVehiclesOfTransporter(transporterId).subscribe((response) => {
        this.vehicles = response;
      console.log(response)

    })
  
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  // OnSelectGetShipment(vehicleId: number) {
  //   this.router.navigate(['transporter/getshipmentofvehicle', vehicleId]);
  // }

  
  
  OnSelectGetShipment(vehicleId: number) {
    this.transportersvc.setSelectedvehicleId(vehicleId);
    console.log(vehicleId);
  }
}