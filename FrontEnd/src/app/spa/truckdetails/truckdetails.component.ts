import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { ActivatedRoute } from '@angular/router';
import { Selltransport } from 'src/app/vendors/selltransport';

@Component({
  selector: 'app-truckdetails',
  templateUrl: './truckdetails.component.html',
  styleUrls: ['./truckdetails.component.css']
})
export class TruckdetailsComponent implements OnInit {
  vehicleId: any;
  SellTransports:Selltransport |any;
  constructor(private svc:VendorService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.vehicleId= this.route.snapshot.paramMap.get('id')
    console.log(this.vehicleId);
    this.svc.getSellTransport(this.vehicleId).subscribe((response)=>{
      this.SellTransports=response;
      console.log(response);

    })
  }

}
