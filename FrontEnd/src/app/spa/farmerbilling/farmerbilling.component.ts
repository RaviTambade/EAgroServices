import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { Collection } from 'src/app/vendors/collection';
import { Billing } from 'src/app/vendors/billing';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-farmerbilling',
  templateUrl: './farmerbilling.component.html',
  styleUrls: ['./farmerbilling.component.css']
})
export class FarmerbillingComponent implements OnInit{
  billing:Billing|any;
  collectionId:any;
  constructor(private svc:CollectionService,private route:ActivatedRoute){}

  ngOnInit(): void {
this.collectionId=this.route.snapshot.paramMap.get('id')
      this.svc.collectionBill(this.collectionId).subscribe((response)=>{
  this.billing=response;
  console.log(response);
  })

}
}


