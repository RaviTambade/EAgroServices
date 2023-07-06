import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { never } from 'rxjs';
import { CollectionService } from 'src/app/spa/collection.service';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { Datefilter } from 'src/app/vendors/datefilter';

@Component({
  selector: 'app-filterbydate',
  templateUrl: './filterbydate.component.html',
  styleUrls: ['./filterbydate.component.css']
})
export class FilterbydateComponent implements OnInit{
dateFilter:Datefilter={
  fromDate: '',
  toDate: ''
};
collectionViewModels:Collectionviewmodel[] |any;
farmerId:number| any;
@Output() newCollection=new EventEmitter<any>();

constructor(private route:ActivatedRoute,private svc:CollectionService){}
ngOnInit(): void {
  this.farmerId=this.route.snapshot.paramMap.get("id")
}
onClick(){
 this.svc.getFarmerCollectionByDate(this.farmerId,this.dateFilter).subscribe((response)=>{
  this.collectionViewModels=response
  this.newCollection.emit({collectionViewModels:this.collectionViewModels})

 })
}

resetSelection() {
  window.location.reload();
  } 
 
}
