import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/vendors/collection';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { CollectionService } from '../collection.service';


@Component({
  selector: 'app-editcollection',
  templateUrl: './editcollection.component.html',
  styleUrls: ['./editcollection.component.css']
})
export class EditcollectionComponent {
  collectionViewModel:Collectionviewmodel | any;
  collectionId:number |any;
  collection:Collection |any;
  status:boolean |any;
  constructor(private route: ActivatedRoute,public svc:CollectionService){}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id');
   }
edit(){
  console.log("edit called")
  this.svc.editCollection(this.collectionId,this.collectionViewModel).subscribe((response)=>{
    this.status=response
    console.log(response)
  });
}
receiveCollection($event: any) {
  this.collectionViewModel = $event.collectionViewModel
}

}

