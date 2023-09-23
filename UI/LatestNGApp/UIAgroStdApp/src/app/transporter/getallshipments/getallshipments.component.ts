import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleCorporateShipment } from 'src/app/Models/vehicle-corporate-shipment';
import { CorporateService } from 'src/app/Services/corporate.service';
import { TransporterService } from 'src/app/Services/transporter.service';

@Component({
  selector: 'app-getallshipments',
  templateUrl: './getallshipments.component.html',
  styleUrls: ['./getallshipments.component.css']
})
export class GetallshipmentsComponent implements OnInit {
  transporterId: number | undefined
  vehicleCorporateshipment: VehicleCorporateShipment;
  vehicleCorporateshipments: VehicleCorporateShipment[]
  constructor(private transportersvc: TransporterService,
    private crpSvc: CorporateService,
    private router: Router) {
    this.vehicleCorporateshipment = {
      shipmentId: 0,
      vehicleId: 0,
      corporateId: 0,
      vehicleType: '',
      rtoNumber: '',
      kilometers: '',
      status: '',
      shipmentDate: '',
      companyName: ''
    }
    this.vehicleCorporateshipments = []

  }

  ngOnInit(): void {
     this.transportersvc.gettransporterIdByUserId().subscribe((transporterId)=>{
      this.transportersvc.getAllShipmentsOfTransporter(transporterId).subscribe((response) => {
        this.vehicleCorporateshipments = response
        let corporateIds = this.vehicleCorporateshipments.map(item => item.corporateId)
          .filter((number, index, array) => array.indexOf(number) === index);
        let crpId = corporateIds.join(',');
        console.log(crpId)
        this.crpSvc.getCorporates(crpId).subscribe((names) => {
          console.log(names)
          let corporationNames = names
          this.vehicleCorporateshipments.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.corporateId);
            if (matchingItem != undefined)
              item.companyName = matchingItem.name;
            console.log(matchingItem)
          });
        });
      });
    })
  }
  // onClickShipmentDetails(shipmentId: number) {
  //   this.router.navigate(['transporter/shipmentdetails', shipmentId]);
  // }

  setSelectedShipmentId(shipmentId: number) {
    this.transportersvc.setSelectedShipmentId(shipmentId);
    console.log(shipmentId);
  }
}