import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError, Subscription } from 'rxjs';
import { CorporateService } from 'src/app/corporate.service';
import { Shipment } from '../shipment';
import { TransporterService } from '../transporter.service';

@Component({
  selector: 'app-getshipmentsofvehicle',
  templateUrl: './getshipmentsofvehicle.component.html',
  styleUrls: ['./getshipmentsofvehicle.component.css']
})
export class GetshipmentsofvehicleComponent implements OnInit {
shipments:Shipment[];
vehicleId:number |any;
subscription:Subscription;
shipment:Shipment={
  id: 0,
  vehicleId: 0,
  merchantId: 0,
  kilometers: 0,
  status: '',
  shipmentDate: ''
}
name:any ;
constructor(private svc:TransporterService,private route: ActivatedRoute,private crpSvc:CorporateService){
  this.shipments=[],
  this.subscription=new Subscription();
}
  ngOnInit(): void {
    console.log("in")
     this.vehicleId=1
      this.subscription=this.svc.getShipmentsOfVehicle(this.vehicleId).subscribe((response) => {
        this.shipments = response;
        console.log(response)
      });
      
    this.svc.getCorporateId(1).subscribe((corporateId:string)=>{
      this.crpSvc.getCorporates(corporateId).subscribe((response)=>{
        const firstItem = response[0];
        this.name = firstItem ? firstItem.name : ''; 
      console.log(response)
      })
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
