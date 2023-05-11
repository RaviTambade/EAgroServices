import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { Purchaseviewmodel } from '../purchaseviewmodel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchasedetails',
  templateUrl: './purchasedetails.component.html',
  styleUrls: ['./purchasedetails.component.scss']
})
export class PurchasedetailsComponent implements OnInit {
  farmerId: number | string;
  purchaseViewModel: Purchaseviewmodel[];
  constructor(private svc: FarmerService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
    
    if (this.farmerId != undefined) {
      this.svc.getFarmerPurchaseDetails(this.farmerId).subscribe((response) => {
        this.purchaseViewModel = response;
        console.log(this.purchaseViewModel);
      }
      )
    };
  }


  // onClick(){
  // this.svc.getFarmerPurchaseDetails(this.farmerId).subscribe((response)=>{
  //   this.purchaseViewModel = response;
  //   console.log(this.purchaseViewModel);
  // })

  //}

}

