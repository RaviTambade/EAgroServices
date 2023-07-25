import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Goodscollection } from '../goodscollection';
import { CorporateService } from 'src/app/corporate.service';

@Component({
  selector: 'app-goodscollection',
  templateUrl: './goodscollection.component.html',
  styleUrls: ['./goodscollection.component.css']
})
export class GoodscollectionComponent implements OnInit {
  farmerId = 2;
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
    //  this.route.paramMap.subscribe((params)=>{
    //   this.farmerId=params.get('id');
    //  })
    this.svc.getFarmerCollection(this.farmerId).subscribe((response) => {
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
   onClick(collectionId:number){
    console.log(collectionId);
   this.router.navigate(['/farmer/verifiedcollection/',collectionId]);
   }
}


