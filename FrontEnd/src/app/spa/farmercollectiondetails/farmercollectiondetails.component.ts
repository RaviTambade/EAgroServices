import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/vendors/collection';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-farmercollectiondetails',
  templateUrl: './farmercollectiondetails.component.html',
  styleUrls: ['./farmercollectiondetails.component.css']
})
export class FarmercollectiondetailsComponent implements OnInit{
  collectionViewModels:Collectionviewmodel[] |any;
  collection:Collection|any;
  farmerId:any;
  constructor(private svc:CollectionService,private route:ActivatedRoute){}
ngOnInit(): void {
 this.farmerId= this.route.snapshot.paramMap.get('id');
 this.svc.getCollectionByFarmer(this.farmerId).subscribe((response)=>{
  this.collectionViewModels=response
  console.log(response)
 })
}


}
