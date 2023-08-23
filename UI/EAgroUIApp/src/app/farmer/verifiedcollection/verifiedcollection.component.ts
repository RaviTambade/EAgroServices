import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../Services/farmer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Verifiedcollection } from 'src/app/Models/verifiedcollection';
import { CorporateService } from 'src/app/Services/corporate.service';

@Component({
  selector: 'app-verifiedcollection',
  templateUrl: './verifiedcollection.component.html',
  styleUrls: ['./verifiedcollection.component.css']
})
export class VerifiedcollectionComponent implements OnInit {
 
  verifiedCollections: Verifiedcollection[] = [];
  paidStatus='paid';
  unpaidStatus='unpaid';
  constructor(private svc: FarmerService, private route: ActivatedRoute, private crpSvc: CorporateService,private router:Router) { }
  ngOnInit(): void {
    
    this.svc.getVerifiedCollection().subscribe((response) => {
      this.verifiedCollections = response;
      console.table(response);
      let distinctcollectioncenterIds = this.verifiedCollections.map(item => item.corporateId)
        .filter((number, index, array) => array.indexOf(number) === index);

      let collectionCenterIdString = distinctcollectioncenterIds.join(',');

      this.crpSvc.getCorporates(collectionCenterIdString).subscribe((names) => {
        let corporationNames = names
        this.verifiedCollections.forEach(item => {
          let matchingItem = corporationNames.find(element => element.id === item.corporateId);
          if (matchingItem != undefined)
            item.collectionCenterName = matchingItem.name;
        });
      });
    })
  }
onClick(){
  console.log(this.paidStatus);
  this.router.navigate(['farmer/paidcollection/'+ this.paidStatus]);
}

unpaidClick(){
  this.router.navigate(['farmer/unpaidcollection/'+this.unpaidStatus]);
}
}
