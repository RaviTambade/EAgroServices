import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-collectionlist',
  templateUrl: './collectionlist.component.html',
  styleUrls: ['./collectionlist.component.css']
})
export class CollectionlistComponent {
  
collections:any[]=[{
  'date':'2022-08-09',
  'collectionId':1,
  'quantity':20,
  'container':'bags',
  'crop':'potato',
  'rateperkg':20,
},
{
  'date':'2022-08-09',
  'collectionId':2,
  'quantity':30,
  'container':'bags',
  'crop':'onion',
  'rateperkg':30,
},
{
  'date':'2022-08-09',
  'collectionId':3,
  'quantity':24,
  'container':'bags',
  'crop':'onion',
  'rateperkg':40,
},
{
  'date':'2022-08-09',
  'collectionId':4,
  'quantity':25,
  'container':'bags',
  'crop':'onion',
  'rateperkg':50,
},
{
  'date':'2022-08-09',
  'collectionId':5,
  'quantity':35,
  'container':'bags',
  'crop':'potato',
  'rateperkg':50,
},
{
  'date':'2022-08-09',
  'collectionId':6,
  'quantity':40,
  'container':'bags',
  'crop':'potato',
  'rateperkg':70,
},
{
  'date':'2022-08-09',
  'collectionId':7,
  'quantity':20,
  'container':'bags',
  'crop':'potato',
  'rateperkg':60,
}]
constructor(private router:Router,private route:ActivatedRoute){}

OnClickCollection(id:number){
  this.router.navigate(['details/',id],{relativeTo:this.route})
}
}
