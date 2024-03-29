import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../Services/farmer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Goodscollection } from 'src/app/Models/goodscollection';
import { CorporateService } from 'src/app/Services/corporate.service';

@Component({
  selector: 'app-goodscollection',
  templateUrl: './goodscollection.component.html',
  styleUrls: ['./goodscollection.component.css']
})
export class GoodscollectionComponent implements OnInit {
 
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
     
    this.svc.getFarmerCollection().subscribe((response) => {
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

  onClickVerified(){
    this.router.navigate(['farmer/verifiedcollection'])
  }
}


