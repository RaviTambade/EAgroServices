import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collectiontransportation',
  templateUrl: './collectiontransportation.component.html',
  styleUrls: ['./collectiontransportation.component.css']
})
export class CollectiontransportationComponent implements OnInit{
  collectionId: any;
  transport: any;
constructor(private svc:CollectionService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id')
          this.svc.collectiontransportation(this.collectionId).subscribe((response)=>{
      this.transport=response;
      console.log(response);

})
  }
}