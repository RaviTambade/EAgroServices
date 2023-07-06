import { Component } from '@angular/core';
import { AddressesService } from '../addresses.service';
import { NgForm } from '@angular/forms';
import { Addresses } from 'src/app/addresses';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent  {
 
  address:Addresses={
    personId: 3,
    latitude: '18.535317',
    longitude: '9.595334',
    landMark: '',
    pinCode: ''
  }

  status: boolean | undefined;

  constructor(private svc:AddressesService){}

 
  onUpdate(form:NgForm){
   this.address.pinCode= form.value.pincode;
   this.address.landMark=form.value.landmark;
   console.log(this.address);
     this.svc.updateAddress(this.address).subscribe((res) => {
      this.status = res;
      console.log(res);
});
}

}
