import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { ActivatedRoute } from '@angular/router';
import { Selltransport } from 'src/app/vendors/selltransport';
import { Vendor } from 'src/app/vendors/vendor';
import { User } from 'src/app/vendors/user';
import { Sell } from 'src/app/vendors/sell';

@Component({
  selector: 'app-truckdetails',
  templateUrl: './truckdetails.component.html',
  styleUrls: ['./truckdetails.component.css']
})
export class TruckdetailsComponent implements OnInit {
  vehicleId: any;
  SellTransports: Selltransport | any;
  user: User | any;
  vehicleNumber:any;
  sells:Sell|any;
  
  constructor(private svc: VendorService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('id')
    console.log(this.vehicleId);
    this.vehicleNumber=localStorage.getItem('vehicleNumber');
    this.svc.getSellTransport(this.vehicleId).subscribe((response) => {
      this.SellTransports = response;
      console.log(response);

    })
  }
  onClick(id:number) {
    console.log(id);
    console.log("onClick");

  }

}
