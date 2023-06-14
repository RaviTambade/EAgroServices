import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollectionService } from '../collection.service';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';

@Component({
  selector: 'app-collectionlist',
  templateUrl: './collectionlist.component.html',
  styleUrls: ['./collectionlist.component.css']
})
export class CollectionlistComponent implements OnInit {

// collections:any[] |any;
farmers:any[]|any;
collections:Collectionviewmodel[] =[];


constructor(private svc:CollectionService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.svc.getCollections().subscribe((res)=>{
      this.collections=res;
      console.log( this.collections);
    });
  } 
OnClickCollection(id:number){
this.router.navigate(['./',id],{relativeTo:this.route})
}
}

