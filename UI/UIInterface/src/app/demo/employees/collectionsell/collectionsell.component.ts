import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Collectionsell } from 'src/app/Models/collectionsell';
import { FreightRate } from 'src/app/Models/freight-rate';
import { Sell } from 'src/app/Models/sell-item';
import { MerchantService } from 'src/app/Services/merchant.service';

@Component({
  selector: 'app-collectionsell',
  templateUrl: './collectionsell.component.html',
  styleUrls: ['./collectionsell.component.scss']
})
export class CollectionsellComponent  {
  sell:Sell={
    merchantId: 1,
    vehicleId: 1,
    collectionId: 1,
    netWeight: 2000,
    ratePerKg: 20,
    quantity: 1
  }
  freightRate:FreightRate={
    fromDestination: 'pune',
    toDestination: 'mumbai',
    kilometers: 200,
    ratePerKm: 20
  }
  collectionsell:Collectionsell={
    sell:this.sell,
    freightRate: this.freightRate,
  };
    constructor(private http: HttpClient,private svc:MerchantService) { }
  
    onSubmit() {
console.log(this.collectionsell);
this.svc.collectionSellBilling(this.collectionsell).subscribe((response)=>{
  console.log(response)
})
      }
     
    }
    
  
  
  
  
  
  
  


