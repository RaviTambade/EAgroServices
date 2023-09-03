import { Component, OnInit, ViewRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransporterService } from '../../Services/transporter.service';
import { Vehicle } from 'src/app/Models/vehicle';

@Component({
  selector: 'app-vehiclesoftransporter',
  templateUrl: './vehiclesoftransporter.component.html',
  styleUrls: ['./vehiclesoftransporter.component.css']
})
export class VehiclesoftransporterComponent implements OnInit {
  transporterId: number | undefined;
  vehicles: Vehicle[];
  selectedVehicleId:number |null=null
  activeAction: 'update' |'shipment' | null = null;
  subscription: Subscription;
  showActions: boolean = true;
  constructor(private svc: TransporterService,
    private router: Router) {
    this.vehicles = [];
    this.subscription = new Subscription();
  }
  ngOnInit(): void {
    this.transporterId = Number(localStorage.getItem("transporterId"));
    this.subscription = this.svc.getVehiclesOfTransporter(this.transporterId).subscribe((response) => {
      this.vehicles = response;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  OnSelectGetShipment(vehicleId: number) {
    this.router.navigate(['/transporter/shipments', vehicleId]);
  }
  onAddNewVehicle() {
    this.router.navigate(['transporter/addvehicle']);
  }

  onActionClick(action:'update' | 'shipment',vehicleId:number){
    if (
      this.activeAction === action &&
      this.selectedVehicleId === vehicleId
    ) {
      this.activeAction = null;
      this.selectedVehicleId = null;
    } else {
      this.activeAction = action;
      this.selectedVehicleId = vehicleId;
    }  }
}
