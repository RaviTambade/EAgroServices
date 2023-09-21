import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShipmentItemDetails } from 'src/app/Models/shipment-item-details';
import { Shipmentsmerchant } from 'src/app/Models/shipmentsmerchant';
import { CorporateService } from 'src/app/Services/corporate.service';
import { ShipmentService } from 'src/app/Services/shipment.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-getvehicleshipmentitems',
  templateUrl: './getvehicleshipmentitems.component.html',
  styleUrls: ['./getvehicleshipmentitems.component.css']
})
export class GetvehicleshipmentitemsComponent implements OnInit {
  shipmentItemsDetails: ShipmentItemDetails[] = [];
  shipmentId: string | any
  shipment: Shipmentsmerchant = {
    corporateId: 0,
    companyName: '',
    id: '',
    vehicleId: 0,
    merchantId: 0,
    kilometers: 0,
    status: '',
    shipmentDate: ''
  }
  constructor(private svc: ShipmentService,
    private corpsvc: CorporateService,
    private usrsvc: UserService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
   
    this.route.paramMap.subscribe((params) => {
        this.shipment.id = this.shipmentId
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
