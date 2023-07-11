import { Component } from '@angular/core';
import { Location } from 'src/app/location/location';
import { LocationService } from '../location.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent {

  address : Location =
  {
    userId: 2,
    latitude: '18.12345',
    longitude: '9.56789',
    landMark: '',
    pinCode: ''
  }
  constructor(private svc:LocationService){}

 
  onInsert(form:NgForm){
   this.address.pinCode= form.value.pincode;
   this.address.landMark=form.value.landmark;
   console.log(this.address);
     this.svc.addAddress(this.address).subscribe((res) => {
      console.log(res);
    });
  }
}
