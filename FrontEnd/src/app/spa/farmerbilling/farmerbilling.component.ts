import { Component, Input, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Collectionbill } from 'src/app/vendors/collectionbill';
import { Location } from '@angular/common';

@Component({
  selector: 'app-farmerbilling',
  templateUrl: './farmerbilling.component.html',
  styleUrls: ['./farmerbilling.component.css']
})
export class FarmerbillingComponent implements OnInit {
  @Input() farmerName: string;
  @Input() cropName: string;
  @Input() totalWeight: number;
  billing: Collectionbill | undefined;
  farmerId:number |any;
  collectionId: any;
  paymentStatus:boolean=false;
  constructor(private svc: CollectionService, private route: ActivatedRoute, private location: Location,private router:Router) {
    this.farmerName = '',
      this.cropName = '',
      this.totalWeight = 0
  }

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.paramMap.get('id')
    this.svc.getcollectionBill(this.collectionId).subscribe((response) => {
      this.billing = response;
      console.log(response);
    })
  }
  goBack(): void {
    this.location.back();
  }

  onClick(): void {
    if (this.billing) {
      this.svc.getFarmerId(this.collectionId).subscribe((response) => {
        this.farmerId = response;
        console.log(this.farmerId)
        if (this.farmerId) {
          this.router.navigate(['/farmers', this.farmerId]);
        }
      });
    }
  }
  createPayment(){
    this.paymentStatus=true
    
  }

  
}


