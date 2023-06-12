import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-editcollection',
  templateUrl: './editcollection.component.html',
  styleUrls: ['./editcollection.component.css']
})
export class EditcollectionComponent {
  collectionId:number |any;
  collection:any;
  constructor(private route: ActivatedRoute,public svc:CollectionService){}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id');
    this.svc.getCollection(this.collectionId)
  }
}
