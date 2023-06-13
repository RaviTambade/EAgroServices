import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-editcollection',
  templateUrl: './editcollection.component.html',
  styleUrls: ['./editcollection.component.css']
})
export class EditcollectionComponent {
  collectionId:number |any;
  collection:any;
  constructor(private route: ActivatedRoute,public svc:CollectionService,private router:Router){}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id');
    this.collection=this.svc.getCollection(this.collectionId)
   }
edit():any{
  this.svc.editCollection(this.collection);
this.router.navigate(['./collections']);
  console.log(this.collection);

}
}
