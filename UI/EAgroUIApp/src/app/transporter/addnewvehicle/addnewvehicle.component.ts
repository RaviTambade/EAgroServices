import { Component, OnInit } from '@angular/core';
import { TransporterService } from '../../Services/transporter.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/Models/vehicle';

@Component({
  selector: 'app-addnewvehicle',
  templateUrl: './addnewvehicle.component.html',
  styleUrls: ['./addnewvehicle.component.css']
})
export class AddnewvehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicle: Vehicle = {
    id: 0,
    transporterId: Number(localStorage.getItem('transporterId')),
    vehicleType: '',
    rtoNumber: ''
  }
  status: boolean;
  constructor(private svc: TransporterService) {
    this.vehicleForm = new FormGroup({
      rtoNumber: new FormControl('', [Validators.required]),
      vehicleType: new FormControl('', [Validators.required])
    })
    this.status = false
  }
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.vehicleForm.valid) {
      let vehicle: Vehicle = {
        vehicleType: this.vehicleForm.get('vehicleType')?.value,
        rtoNumber: this.vehicleForm.get('rtoNumber')?.value,
        id: 0,
        transporterId: Number(localStorage.getItem('transporterId'))
      }
    }
    this.svc.addVehicle(this.vehicle).subscribe((response) => {
      this.status = response
      console.log(response)
    })

  }

}
