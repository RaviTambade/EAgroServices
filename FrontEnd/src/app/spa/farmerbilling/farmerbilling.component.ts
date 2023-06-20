import { Component, Input, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute } from '@angular/router';
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
  collectionId: any;
  constructor(private svc: CollectionService, private route: ActivatedRoute, private location: Location) {
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

  
}


