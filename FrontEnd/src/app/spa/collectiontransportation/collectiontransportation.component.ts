import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sellview } from 'src/app/vendors/sellview';
import { SellBilling } from 'src/app/vendors/sell-billing';
import { Merchant } from 'src/app/vendors/merchant';
import { Vehicle } from 'src/app/vendors/vehicle';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';

@Component({
  selector: 'app-collectiontransportation',
  templateUrl: './collectiontransportation.component.html',
  styleUrls: ['./collectiontransportation.component.css']
})
export class CollectiontransportationComponent implements OnInit {
  collectionViewModel:Collectionviewmodel |any;
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
  merchants:Merchant |any;
 vehicles:Vehicle |any;
  constructor(private svc: CollectionService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.collectionId = this.route.snapshot.paramMap.get('id')
    this.svc.collectiontransportation(this.collectionId).subscribe((response) => {
      this.sellview = response;
      console.log(response);
    })
    this.svc.getMerchants().subscribe((response)=>{
      this.merchants=response
    })
    this.svc.getVehicles().subscribe((response)=>{
this.vehicles=response
    })
  }

  insert(){
    this.sellBill.sell.collectionId=this.collectionId
    console.log(this.sellBill)
    this.svc.insertBillDetails(this.sellBill).subscribe((response)=>{
      console.log(response)
    });
}
receiveCollection($event:any){
  this.collectionViewModel=$event.collectionViewModel;
}
onClick(id: number) {
  this.router.navigate(['/farmers',id]);
}
}