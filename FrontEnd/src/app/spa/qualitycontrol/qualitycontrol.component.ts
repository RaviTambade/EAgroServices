import { Component, Input, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/vendors/collection';

@Component({
  selector: 'app-qualitycontrol',
  templateUrl: './qualitycontrol.component.html',
  styleUrls: ['./qualitycontrol.component.css']
})
export class QualitycontrolComponent implements OnInit {
  constructor (private svc:CollectionService,private route:ActivatedRoute){}
  @Input() collectionId:number |any;
  collection:Collection |any;
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id');
     this.svc.editCollection(this.collectionId,this.collection).subscribe((response)=>{
      this.collection=response;
  })

}
}
