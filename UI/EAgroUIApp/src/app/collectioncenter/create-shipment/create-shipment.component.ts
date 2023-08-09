import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CorporateService } from 'src/app/corporate.service';
import { NameId } from 'src/app/name-id';
import { ShipmentService } from 'src/app/merchant/shipment.service';
import { TransporterService } from 'src/app/transporter/transporter.service';
import { Vehiclenumberid } from 'src/app/transporter/vehiclenumberid';
import { MerchantService } from 'src/app/merchant/merchant.service';
import { Corporate } from 'src/app/corporate';
@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css']
})
export class CreateShipmentComponent implements OnInit {
  shipmentForm: FormGroup;
  merchants: Corporate[] = []
  vehicles: Vehiclenumberid[] = []
  showForm:boolean=true
  constructor(private formBuilder: FormBuilder, private merchantsvc: MerchantService, private corpsvc: CorporateService, private svc: ShipmentService, private trpSvc: TransporterService, public mrtSvc: MerchantService) {
    this.shipmentForm = this.formBuilder.group({
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
      this.corpsvc.getCorporates(merchantIdString).subscribe((names) => {
        let corporationNames = names
        this.merchants.forEach(item => {
          let matchingItem = corporationNames.find(element => element.id === item.corporateId);
          if (matchingItem != undefined)
            item.name = matchingItem.name;
        });
      });
    });

    this.trpSvc.getVehicleNumbers().subscribe((vehicles) => {
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
        status: "inprogress"
      }
      console.log(shipment)

      this.mrtSvc.getIdOfMerchant(shipment.merchantId).subscribe((res) => {
        shipment.merchantId = res
        console.log(res)
        this.svc.addShipment(shipment).subscribe((res) => {
          console.log(res);
          if(res){
          this.shipmentForm.reset();
          this.showForm=false
          }
        });
      });

    }
  }
}
