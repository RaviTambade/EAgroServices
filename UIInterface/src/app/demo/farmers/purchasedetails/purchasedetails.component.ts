import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { Purchaseviewmodel } from '../purchaseviewmodel';

@Component({
  selector: 'app-purchasedetails',
  templateUrl: './purchasedetails.component.html',
  styleUrls: ['./purchasedetails.component.scss']
})
export class PurchasedetailsComponent implements OnInit {
  farmerId :number ;
  purchaseViewModel:Purchaseviewmodel[];
  constructor(private svc:FarmerService){}
  ngOnInit(): void {
    this.svc.getFarmerPurchaseDetails(2).subscribe((response)=>{
      this.purchaseViewModel = response;
      console.log(this.purchaseViewModel);
    }
    )};

  // onClick(){
  // this.svc.getFarmerPurchaseDetails(this.farmerId).subscribe((response)=>{
  //   this.purchaseViewModel = response;
  //   console.log(this.purchaseViewModel);
  // })
    
  //}
  
}

