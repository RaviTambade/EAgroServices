import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError, Subscription } from 'rxjs';
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
constructor(private svc:TransporterService,private route: ActivatedRoute){
  this.shipments=[],
  this.subscription=new Subscription();
}
  ngOnInit(): void {
     this.vehicleId=this.route.snapshot.paramMap.get('id')
      this.subscription=this.svc.getShipmentsOfVehicle(this.vehicleId).subscribe((response) => {
        this.shipments = response;
        console.log(response)
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
