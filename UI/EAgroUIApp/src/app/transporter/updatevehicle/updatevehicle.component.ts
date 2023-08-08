import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { TransporterService } from '../transporter.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-updatevehicle',
  templateUrl: './updatevehicle.component.html',
  styleUrls: ['./updatevehicle.component.css']
})
export class UpdatevehicleComponent implements OnInit {
vehicle:Vehicle
vehicleId:any
constructor(private svc:TransporterService,private route:ActivatedRoute){
  this.vehicle={
    id: 0,
    transporterId:Number( localStorage.getItem("transporterId")),
    vehicleType: '',
    rtoNumber: ''
  }
}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.vehicle.id=this.vehicleId
      this.vehicleId = params.get('id');
  
  })
}
updateVehicle(){
  this.svc.updateVehicle(this.vehicleId,this.vehicle).subscribe((res)=>{
    console.log(res)
   })
}

}
