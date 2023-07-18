import { Component, OnInit } from '@angular/core';
import { Transporter } from '../transporter';
import { TransporterService } from '../transporter.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-addnewvehicle',
  templateUrl: './addnewvehicle.component.html',
  styleUrls: ['./addnewvehicle.component.css']
})
export class AddnewvehicleComponent implements OnInit{
vehicle:Vehicle={
  id: 0,
  transporterId: 1,
  vehicleType: '',
  rtoNumber: ''
}
status:boolean;
constructor(private svc:TransporterService){
  this.status=false
}
ngOnInit(): void {
}
onSubmit(){
  this.svc.addVehicle(this.vehicle).subscribe((response)=>{
    this.status=response
    console.log(response)
  })
}

}
