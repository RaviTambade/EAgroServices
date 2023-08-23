import { Component, OnInit } from '@angular/core';
import { TransporterService } from '../../Services/transporter.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Vehicle } from 'src/app/Models/vehicle';

@Component({
  selector: 'app-updatevehicle',
  templateUrl: './updatevehicle.component.html',
  styleUrls: ['./updatevehicle.component.css']
})
export class UpdatevehicleComponent implements OnInit {
vehicleId:any
vehicle:Vehicle={
  id: 0,
  transporterId: 0,
  vehicleType: '',
  rtoNumber: ''
}
  constructor(
    private svc: TransporterService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.vehicleId = params.get('id');
      // Load vehicle data here and populate the form
    });
    this.svc.getVehicle(this.vehicleId).subscribe((res)=>{
      this.vehicle=res
      console.log(res)
    })
  }

  updateVehicle(){
    this.svc.updateVehicle(this.vehicleId, this.vehicle).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
