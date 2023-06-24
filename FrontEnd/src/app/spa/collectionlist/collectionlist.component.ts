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
transport(id:number){
  this.router.navigate(['./',id,'transport'],{relativeTo:this.route})
}
OnClickQualityControl(id:number){
  this.router.navigate(['./',id,'qualitycontrol'],{relativeTo:this.route})
}

getQuantity():number{
let quantity=0;
  for(let row of this.collections){
    quantity +=row.collection.quantity
    }
    return quantity;
  }
  getQuantityofBags():number{
    let quantity1=0;
      for(let row of this.collections){
        if(row.collection.containerType=='bags'){
        quantity1 +=row.collection.quantity
        }
        }
        return quantity1;
      }
      getQuantityofCrates():number{
        let quantity2=0;
          for(let row of this.collections){
            if(row.collection.containerType=='crates'){
            quantity2 +=row.collection.quantity
            }
            }
            return quantity2;
          }
          getQuantityofLenoBags():number{
            let quantity3=0;
              for(let row of this.collections){
                if(row.collection.containerType=='lenobags'){
                quantity3 +=row.collection.quantity
                }
                }
                return quantity3;
              }

}