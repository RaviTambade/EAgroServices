import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  collections:Collection[]|any;
  farmerId:any;
  currentPage=0;
  arrLenght=0;
  constructor(private svc:CollectionService,private route:ActivatedRoute,private router:Router){ }
ngOnInit(): void {
 this.farmerId= this.route.snapshot.paramMap.get('id');
 this.svc.getCollectionByFarmer(this.farmerId).subscribe((response)=>{
  const startindex = this.currentPage * 5;
  const endindex = startindex + 5;
  console.log(response)
  this.collectionViewModels=response;
  this.collectionViewModels.slice(startindex, endindex)
  
 })
}
showDetails(id: any) {
  this.router.navigate(['/collections', id],{relativeTo:this.route});
}

next() {
  this.currentPage++;
}
hasNextPage(): boolean {
  const totalpages = Math.trunc(this.arrLenght / 5);
  console.log("🚀 ~ hasnextPage ~ totalpages:", totalpages);
 
  if(this.arrLenght %5 ==0){
    return this.currentPage < totalpages-1;
  }

  if (this.currentPage < totalpages ) {
    return true;
  }
  return false;
}
hasPreviousPage(): boolean {
  return this.currentPage != 0;
}
previous() {
  this.currentPage--;
}
}
