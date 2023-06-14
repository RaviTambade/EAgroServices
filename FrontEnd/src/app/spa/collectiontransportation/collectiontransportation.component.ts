import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute } from '@angular/router';
import { Sellview } from 'src/app/vendors/sellview';
import { Sell } from 'src/app/vendors/sell';

@Component({
  selector: 'app-collectiontransportation',
  templateUrl: './collectiontransportation.component.html',
  styleUrls: ['./collectiontransportation.component.css']
})
export class CollectiontransportationComponent implements OnInit{
  collectionId: any;
  sell:Sell|any;
  sellview:Sellview|any;
constructor(private svc:CollectionService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id')
          this.svc.collectiontransportation(this.collectionId).subscribe((response)=>{
      this.sellview=response;
      console.log(response);

})
  }
}