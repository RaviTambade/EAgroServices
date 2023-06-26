import { Component } from '@angular/core';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { Datefilter } from 'src/app/vendors/datefilter';

@Component({
  selector: 'app-filterbydate',
  templateUrl: './filterbydate.component.html',
  styleUrls: ['./filterbydate.component.css']
})
export class FilterbydateComponent {
dateFilter:Datefilter |any;
collections:Collectionviewmodel[] |any;
// farmerId:number;

constructor(){
  this.collections
}
}
