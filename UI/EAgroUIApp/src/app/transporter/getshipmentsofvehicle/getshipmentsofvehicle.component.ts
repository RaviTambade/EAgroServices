import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectUnsubscribedError, Subscription } from 'rxjs';
import { CorporateService } from 'src/app/corporate.service';
import { Shipment } from '../shipment';
import { Shipmentsmerchant } from '../shipmentsmerchant';
// import { Shipmentsmerchant } from '../shipmentsmerchant';
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
shipmentmerchant:Shipmentsmerchant={
  corporateId: 0,
  id: 0,
  vehicleId: 0,
  merchantId: 0,
  kilometers: 0,
  status: '',
  shipmentDate: '',
  companyName: ''
}
shipmentmerchants:Shipmentsmerchant[];
// name:any ;
constructor(private svc:TransporterService,private route: ActivatedRoute,private crpSvc:CorporateService){
  this.shipments=[],
  this.subscription=new Subscription();
  this.shipmentmerchants=[]
}
  ngOnInit(): void {
      this.vehicleId=1
        this.subscription=this.svc.getShipmentsOfVehicle(this.vehicleId).subscribe((response) => {
          this.shipmentmerchants = response;
          console.log(response)
          let distinctmerchantIdIds = this.shipmentmerchants.map(item => item.merchantId)
          .filter((number, index, array) => array.indexOf(number) === index);
          let corporateIds = this.shipmentmerchants.map(item => item.corporateId)
          .filter((number, index, array) => array.indexOf(number) === index);
          
      let merchantIdString = distinctmerchantIdIds.join(',');
      let crpId = corporateIds.join(',');
      console.log(crpId)
      console.log(merchantIdString)
            // this.svc.getCorporateId(shipment.merchantId).subscribe((corporateId: string) => {
              this.crpSvc.getCorporates(crpId).subscribe((names) => {
                console.log(names)
                let corporationNames = names
                this.shipmentmerchants.forEach(item => {
                  let matchingItem = corporationNames.find(element => element.id === item.corporateId);
                  if (matchingItem != undefined)
                    item.companyName = matchingItem.name;
                });
              });
          // });
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
