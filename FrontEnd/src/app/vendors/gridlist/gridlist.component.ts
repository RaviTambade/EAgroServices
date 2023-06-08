import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-gridlist',
  templateUrl: './gridlist.component.html',
  styleUrls: ['./gridlist.component.css']
})
export class GridlistComponent implements OnInit {
  collections: Collection[] = [];

  constructor(private svc: VendorService) {}

  ngOnInit(): void {
    this.svc.GetCollections().subscribe((collections: Collection[]) => {
      this.collections = collections.slice(0,10);
      console.log(collections);
    });
  }
  viewCollection(){
    this.svc.GetCollections().subscribe((response)=>{
      console.log(response)
    })

  }
  
}