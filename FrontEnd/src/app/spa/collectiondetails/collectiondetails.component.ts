import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.css']
})
export class CollectiondetailsComponent implements OnInit{
  
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
  this.route.snapshot.paramMap.get('id');
  }

}
