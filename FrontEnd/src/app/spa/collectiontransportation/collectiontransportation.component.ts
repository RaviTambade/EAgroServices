import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute } from '@angular/router';
import { Sellview } from 'src/app/vendors/sellview';
import { SellBilling } from 'src/app/vendors/sell-billing';

@Component({
  selector: 'app-collectiontransportation',
  templateUrl: './collectiontransportation.component.html',
  styleUrls: ['./collectiontransportation.component.css']
})
export class CollectiontransportationComponent implements OnInit {
  collectionId: any;
  sellview: Sellview | any;
  sellBill:SellBilling={
    sell: {
      collectionId: 0,
      merchantId: 0,
      vehicleId: 0,
      quantity: 0,
      netWeight: 0,
      ratePerKg: 0
    },
    freightRate: {
      fromDestination: '',
      toDestination: '',
      kilometers: 0,
      ratePerKm: 0
    }
  };
 
  constructor(private svc: CollectionService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.collectionId = this.route.snapshot.paramMap.get('id')
    this.svc.collectiontransportation(this.collectionId).subscribe((response) => {
      this.sellview = response;
      console.log(response);
    });
  }

  insert(){
    this.sellBill.sell.collectionId=this.collectionId
    console.log(this.sellBill)
    this.svc.insertBillDetails(this.sellBill).subscribe((response)=>{
      console.log(response)
    });
}

}