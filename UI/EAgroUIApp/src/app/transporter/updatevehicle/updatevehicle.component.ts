import { Component, Input, OnInit } from '@angular/core';
import { TransporterService } from '../../Services/transporter.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Vehicle } from 'src/app/Models/vehicle';

@Component({
  selector: 'app-updatevehicle',
  templateUrl: './updatevehicle.component.html',
  styleUrls: ['./updatevehicle.component.css']
})
export class UpdatevehicleComponent implements OnInit {
  vehicleId: string |any
 @Input() vehicle: Vehicle = {
    id: 0,
    transporterId: 0,
    vehicleType: '',
    rtoNumber: ''
  }
  UpdateStatus: boolean = true;
  constructor(
    private svc: TransporterService,
  ) {
  }

  ngOnInit(): void {
    this.svc.getVehicle(this.vehicle.id).subscribe((res) => {
      this.vehicle = res
      console.log(res)

    })
  }

  updateVehicle() {
    if(this.vehicleId)
    this.svc.updateVehicle(this.vehicle.id, this.vehicle).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
