import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-collectionlist',
  templateUrl: './collectionlist.component.html',
  styleUrls: ['./collectionlist.component.css']
})
export class CollectionlistComponent implements OnInit {
collections:any[] |any;

constructor(private svc:CollectionService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.collections=this.svc.getCollections();
  }
OnClickCollection(id:number){
this.router.navigate(['./',id],{relativeTo:this.route})
}
}

