import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute } from '@angular/router';
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
  farmerCollections: Goodscollection[] | undefined;
  goodsCollections: Goodscollection = {
    collectionCenterId: 0,
    corporateId: 0,
    inspectorId: 0,
    cropName: '',
    imageUrl: '',
    containerType: '',
    quantity: 0,
    weight: 0,
    collectionDate: ''
  }
  constructor(private svc: FarmerService, private route: ActivatedRoute, crpSvc: CorporateService) { }
  ngOnInit(): void {

    // let distinctc = this.farmerCollections.map(item => item.collectionCenterCorporaterId)
    // .filter((number, index, array) => array.indexOf(number) === index);
    //  this.route.paramMap.subscribe((params)=>{
    //   this.farmerId=params.get('id');
    //  })
    this.svc.getFarmerCollection(this.farmerId).subscribe((response) => {
      // console.log(this.farmerId);
      this.farmerCollections = response;
      this.corporateId = response.corporateId
      console.log(this.corporateId);
      console.log(response);


      // this.farmerCollections.forEach((collection) => {
      //    this.svc.getCorporateId(this.farmerCollections.corporateId).subscribe((corporateId: string) => {
      // this.crpSvc.getCorporates(this.corporateId).subscribe((response) => {
      //   const firstItem = response[0];
      //   this.name = firstItem ? firstItem.name : '';
      //   console.log(response);


    })
  }
}


