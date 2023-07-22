import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CorporateService } from 'src/app/corporate.service';
import { MerchantShipment } from 'src/app/merchant/merchant-shipment';
import { ShipmentItemDetails } from 'src/app/merchant/shipment-item-details';
import { ShipmentService } from 'src/app/merchant/shipment.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { Shipmentsmerchant } from '../shipmentsmerchant';

@Component({
  selector: 'app-getvehicleshipmentitems',
  templateUrl: './getvehicleshipmentitems.component.html',
  styleUrls: ['./getvehicleshipmentitems.component.css']
})
export class GetvehicleshipmentitemsComponent implements OnInit {
  shipmentItemsDetails: ShipmentItemDetails[] = [];
  shipmentId: any;
  shipment:Shipmentsmerchant={
    corporateId: 0,
    companyName: '',
    id: '',
    vehicleId: 0,
    merchantId: 0,
    kilometers: 0,
    status: '',
    shipmentDate: ''
  }
  constructor(private svc:ShipmentService,private corpsvc:CorporateService,private usrsvc:UserService,
              private route:ActivatedRoute){}
              ngOnInit(): void {
                const selectedShipmentString = localStorage.getItem('selectedShipment');
                if (selectedShipmentString) {
                  this.shipment = JSON.parse(selectedShipmentString);
                } 
                this.route.paramMap.subscribe((params) => {
                  // this.shipment = JSON.parse(localSto rage.getItem('selectedShipment'));
                  this.shipment.id=this.shipmentId
                  this.shipmentId = params.get('id');
                  console.log(this.shipmentId);
            
                  this.svc.getShipmentItems(this.shipmentId).subscribe((res) => {
                    console.log(res);
                    this.shipmentItemsDetails = res;
                    let distinctcollectioncenterIds = this.shipmentItemsDetails.map(item => item.collectionCenterCorporaterId)
                      .filter((number, index, array) => array.indexOf(number) === index);
            
    let distinctfarmerIds = this.shipmentItemsDetails.map(item => item.farmerId)
      .filter((number, index, array) => array.indexOf(number) === index);

    let collectionIdString = distinctcollectioncenterIds.join(',');
    let farmerIdString = distinctfarmerIds.join(',');

    this.corpsvc.getCorporates(collectionIdString).subscribe((names) => {
      let corporationNames = names
      this.shipmentItemsDetails.forEach(item => {
        let matchingItem = corporationNames.find(element => element.id === item.collectionCenterCorporaterId);
        if (matchingItem != undefined)
          item.collectionCenterName = matchingItem.name;
      });
    });

    this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
      let farmerNames = names
      this.shipmentItemsDetails.forEach(item => {
        let matchingItem = farmerNames.find(element => element.id === item.farmerId);
        if (matchingItem != undefined)
        item.farmerName = matchingItem.name;
      });
    });

  });

  })
}
}
