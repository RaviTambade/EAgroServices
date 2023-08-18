import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute } from '@angular/router';
import { CorporateService } from 'src/app/corporate.service';
import { Verifiedcollection } from 'src/app/farmer/verifiedcollection';

@Component({
  selector: 'app-verifiedcollection',
  templateUrl: './verifiedcollection.component.html',
  styleUrls: ['./verifiedcollection.component.css']
})
export class VerifiedcollectionComponent implements OnInit {
 
  verifiedCollections: Verifiedcollection[] = [];


  constructor(private svc: FarmerService, private route: ActivatedRoute, private crpSvc: CorporateService) { }
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

}
