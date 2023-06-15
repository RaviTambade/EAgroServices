import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/vendors/collection';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.css']
})
export class CollectiondetailsComponent implements OnInit{
  collectionViewModel:Collectionviewmodel |any;
  @Output() sendCollection =new EventEmitter();
  @Input() collectionId:number |any;
 collection:Collection |any;
  constructor(private route: ActivatedRoute,public svc:CollectionService,private router:Router){}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id');
    this.svc.getCollection(this.collectionId).subscribe((response)=>{
      this.collectionViewModel=response;
      this.sendCollection.emit({collection:this.collectionViewModel.collection})
      console.log(response);
    }
    )
  }
  showBill(id: any) {
    this.router.navigate(['/farmerbilling',id],{relativeTo:this.route});
  }
  onClick(id: number) {
    this.router.navigate(['/farmers', id]);
  }
 
  }



