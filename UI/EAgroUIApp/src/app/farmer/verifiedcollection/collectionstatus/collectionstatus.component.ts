import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../../Services/farmer.service';
import { Verifiedcollection } from '../../../Models/verifiedcollection';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/Models/invoice';
import { CorporateService } from 'src/app/Services/corporate.service';


@Component({
  selector: 'app-collectionstatus',
  templateUrl: './collectionstatus.component.html',
  styleUrls: ['./collectionstatus.component.css']
})
export class CollectionstatusComponent implements OnInit {
  constructor(private svc:FarmerService,private route:ActivatedRoute,private crpSvc:CorporateService,private router:Router){}
paymentStatus:any;
verifiedCollections: Verifiedcollection[] = [];
invoices:Invoice|any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.paymentStatus = params.get('status');
    })
    this.svc.VerifiedCollection(this.paymentStatus).subscribe((response)=>{
this.verifiedCollections=response;
console.log(response);
    
    let distinctcollectioncenterIds = this.verifiedCollections.map(item => item.corporateId)
    .filter((number, index, array) => array.indexOf(number) === index);

  let collectionCenterIdString = distinctcollectioncenterIds.join(',');

  this.crpSvc.getCorporates(collectionCenterIdString).subscribe((names) => {
    let corporationNames = names
    this.verifiedCollections.forEach(item => {
      let matchingItem = corporationNames.find(element => element.id === item.corporateId);
      if (matchingItem != undefined)
        item.collectionCenterName = matchingItem.name;
      })
  })
})
  }
  invoice(id:number){
this.router.navigate(['farmer/invoice/'+id])
  }

  back(){
    this.router.navigate(['farmer/verifiedcollection/'])
      }
}
