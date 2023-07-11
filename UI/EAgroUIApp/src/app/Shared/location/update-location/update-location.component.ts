import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { NgForm } from '@angular/forms';
import { Location } from '../location'; 

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent {
  address:Location =
  {
    userId: 3,
    latitude: '18.535317',
    longitude: '9.595334',
    landMark: '',
    pinCode: ''
  }

  status: boolean | undefined;

  constructor(private svc:LocationService){}

  onUpdate(form:NgForm){
//    this.address.pinCode= form.value.pincode;
//    this.address.landMark=form.value.landmark;
//    console.log(this.address);
//      this.svc.updateAddress(this.address).subscribe((res) => {
//       this.status = res;
//       console.log(res);
// });
}
}
