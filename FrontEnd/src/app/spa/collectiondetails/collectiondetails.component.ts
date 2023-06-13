import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.css']
})
export class CollectiondetailsComponent implements OnInit{
collectionId:number |any;
collection:any;
  constructor(private route: ActivatedRoute,public svc:CollectionService){}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id');
    this.svc.getCollection(this.collectionId).subscribe((response)=>{
      this.collection=response;
      console.log(response);
    }

    )
  }

}
