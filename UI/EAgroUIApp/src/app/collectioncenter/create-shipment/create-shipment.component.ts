import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentStatus } from 'src/app/Models/Enums/shipment-status';
import { Corporate } from 'src/app/Models/corporate';
import { VehicleNumberId } from 'src/app/Models/vehiclenumberid';
import { CorporateService } from 'src/app/Services/corporate.service';
import { MerchantService } from 'src/app/Services/merchant.service';
import { ShipmentService } from 'src/app/Services/shipment.service';
import { TransporterService } from 'src/app/Services/transporter.service';

@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css']
})
export class CreateShipmentComponent implements OnInit {
  shipmentForm: FormGroup;
  merchants: Corporate[] = []
  vehicles: VehicleNumberId[] = []
  showForm: boolean = true
  constructor(
    private formbuilder: FormBuilder, 
    private merchantsvc: MerchantService, 
    private corppratesvc: CorporateService, 
    private shipmentsvc: ShipmentService, 
    private trnsportersvc: TransporterService, 
     ) {
    this.shipmentForm = this.formbuilder.group({
      vehicleId: ['', Validators.required],
      merchantId: ['', Validators.required],
      kilometers: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.merchantsvc.getMerchantAndCorporateId().subscribe((res) => {
      this.merchants = res;
      let distinctmerchantIds = this.merchants.map(item => item.corporateId)
        .filter((number, index, array) => array.indexOf(number) === index);
      let merchantIdString = distinctmerchantIds.join(',')
      this.corppratesvc.getCorporates(merchantIdString).subscribe((names) => {
        let corporationNames = names
        this.merchants.forEach(item => {
          let matchingItem = corporationNames.find(element => element.id === item.corporateId);
          if (matchingItem != undefined)
            item.name = matchingItem.name;
        });
      });
    });

    this.trnsportersvc.getVehicleNumbers().subscribe((vehicles) => {
      console.log(vehicles)
      this.vehicles = vehicles
    })
  }

  OnSubmit() {

    if (this.shipmentForm.valid) {
      let shipment: any = {
        vehicleId: this.shipmentForm.get('vehicleId')?.value,
        merchantId: this.shipmentForm.get('merchantId')?.value,
        kilometers: this.shipmentForm.get('kilometers')?.value,
        status: ShipmentStatus.inprogress
      }
      console.log(shipment)

      this.merchantsvc.getIdOfMerchant(shipment.merchantId).subscribe((res) => {
        shipment.merchantId = res
        console.log(res)
        this.shipmentsvc.addShipment(shipment).subscribe((res) => {
          console.log(res);
          if (res) {
            this.shipmentForm.reset();
            this.showForm = false
          }
        });
      });

    }
  }
}
