import { Component, OnInit } from '@angular/core';
import { Goodscollection } from '../goodscollection';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporateService } from 'src/app/corporate.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit{

  corporateId: undefined;
  farmerCollections: Goodscollection[]=[];
  goodsCollections: Goodscollection = {
    collectionCenterId: 0,
    corporateId: 0,
    inspectorId: 0,
    cropName: '',
    imageUrl: '',
    containerType: '',
    quantity: 0,
    weight: 0,
    collectionDate: '',
    collectionCenterName: '',
    id: 0
  }
  constructor(private svc: FarmerService, private route: ActivatedRoute,private crpSvc: CorporateService,private router:Router) { }
  ngOnInit(): void {

    // let distinctc = this.farmerCollections.map(item => item.collectionCenterCorporaterId)
    // .filter((number, index, array) => array.indexOf(number) === index);
     
    this.svc.getCollection().subscribe((response) => {
      this.farmerCollections = response;
      this.corporateId = response.corporateId
      console.log(response);

      let distinctcollectioncenterIds = this.farmerCollections.map(item => item.corporateId)
      .filter((number, index, array) => array.indexOf(number) === index);

    let collectionCenterIdString = distinctcollectioncenterIds.join(',');

    this.crpSvc.getCorporates(collectionCenterIdString).subscribe((names) => {
      let corporationNames = names
      this.farmerCollections.forEach(item => {
        let matchingItem = corporationNames.find(element => element.id === item.corporateId);
        if (matchingItem != undefined)
          item.collectionCenterName = matchingItem.name;
      });
    });
    })
  }
  
}
