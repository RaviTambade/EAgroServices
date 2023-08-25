import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Shipment } from 'src/app/Models/shipment';
import { Shipmentsmerchant } from 'src/app/Models/shipmentsmerchant';
import { CorporateService } from 'src/app/Services/corporate.service';
import { TransporterService } from 'src/app/Services/transporter.service';


@Component({
  selector: 'app-getshipmentsofvehicle',
  templateUrl: './getshipmentsofvehicle.component.html',
  styleUrls: ['./getshipmentsofvehicle.component.css']
})
export class GetshipmentsofvehicleComponent implements OnInit {
  shipments: Shipment[];
  vehicleId: number | any;
  subscription: Subscription;
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
  transporterId: number | any;
  constructor(private svc: TransporterService,
    private router: Router,
    private crpSvc: CorporateService,
    private route: ActivatedRoute) {
    this.shipments = [],
      this.subscription = new Subscription();
    this.shipmentmerchants = []
  }
  ngOnInit(): void {
    this.transporterId = Number(localStorage.getItem("transporterId"));
    this.route.paramMap.subscribe((params) => {
        this.shipmentmerchant.vehicleId = this.vehicleId
        this.vehicleId = Number(params.get('id'));

        this.subscription = this.svc.getShipmentsOfVehicle(this.vehicleId).subscribe((response) => {
          this.shipmentmerchants = response;
          let distinctmerchantIds = this.shipmentmerchants.map(item => item.merchantId)
            .filter((number, index, array) => array.indexOf(number) === index);
          let corporateIds = this.shipmentmerchants.map(item => item.corporateId)
            .filter((number, index, array) => array.indexOf(number) === index);
          let merchantIdString = distinctmerchantIds.join(',');
          let crpId = corporateIds.join(',');
          this.crpSvc.getCorporates(crpId).subscribe((names) => {
            let corporationNames = names
            this.shipmentmerchants.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.corporateId);
              if (matchingItem != undefined)
                item.companyName = matchingItem.name;
            });
          });
        });
      })
    }
  
  onClickShipmentDetails(shipment: Shipmentsmerchant) {
    localStorage.setItem('selectedShipment', JSON.stringify(shipment));
    this.router.navigate(['transporter/shipmentdetails', shipment.id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
