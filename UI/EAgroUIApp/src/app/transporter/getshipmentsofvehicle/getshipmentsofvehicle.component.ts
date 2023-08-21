import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ObjectUnsubscribedError, Subscription } from 'rxjs';
import { CorporateService } from 'src/app/corporate.service';
import { Shipment } from '../shipment';
import { Shipmentsmerchant } from '../shipmentsmerchant';
// import { Shipmentsmerchant } from '../shipmentsmerchant';
import { TransporterService } from '../transporter.service';
import { Corporation } from 'src/app/corporation';

@Component({
  selector: 'app-getshipmentsofvehicle',
  templateUrl: './getshipmentsofvehicle.component.html',
  styleUrls: ['./getshipmentsofvehicle.component.css']
})
export class GetshipmentsofvehicleComponent implements OnInit {
  shipments: Shipment[];
  vehicleId:number |any;
  subscription: Subscription;
  // shipment:Shipment={
  //   id: 0,
  //   vehicleId: 0,
  //   merchantId: 0,
  //   kilometers: 0,
  //   status: '',
  //   shipmentDate: ''
  // }
  shipmentmerchant: Shipmentsmerchant = {
    corporateId: 0,
    id: '',
    vehicleId: 0,
    merchantId: 0,
    kilometers: 0,
    status: '',
    shipmentDate: '',
    companyName: ''
  }
  shipmentmerchants: Shipmentsmerchant[];
  selectedShipment: any;
  transporterId:any;
  // name:any ;
  constructor(private svc: TransporterService, private router: Router, private crpSvc: CorporateService,private route:ActivatedRoute) {
    this.shipments = [],
      this.subscription = new Subscription();
    this.shipmentmerchants = []
  }
  ngOnInit(): void {
    this.transporterId = Number(localStorage.getItem("transporterId"));
    this.route.paramMap.subscribe((params) => {
      // this.shipment = JSON.parse(localSto rage.getItem('selectedShipment'));
      this.shipmentmerchant.vehicleId=this.vehicleId
      this.vehicleId = params.get('id');
      console.log(this.vehicleId);

    this.subscription = this.svc.getShipmentsOfVehicle(this.vehicleId).subscribe((response) => {
      console.log(this.vehicleId)
      this.shipmentmerchants = response;
      console.log(response)
      let distinctmerchantIds = this.shipmentmerchants.map(item => item.merchantId)
        .filter((number, index, array) => array.indexOf(number) === index);
      let corporateIds = this.shipmentmerchants.map(item => item.corporateId)
        .filter((number, index, array) => array.indexOf(number) === index);

      let merchantIdString = distinctmerchantIds.join(',');
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
          console.log(matchingItem)
        });
      });
      // });
    });
  })
  }  
onClickShipmentDetails(shipment: Shipmentsmerchant) {
    localStorage.setItem('selectedShipment', JSON.stringify(shipment));
    this.router.navigate(['transporter/shipmentdetails', shipment.id]);
    console.log(shipment.id)
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
