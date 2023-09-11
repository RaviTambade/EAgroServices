import { Component, Input, OnInit } from '@angular/core';
import { CollectionDetails } from 'src/app/Models/collectiondetails';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.css']
})
export class CollectiondetailsComponent implements OnInit {
  collectionDetails:CollectionDetails[]|undefined
  @Input() collectionId!: number;

constructor(private farmerSvc:FarmerService){}
  ngOnInit(): void {
    this.collectionDetail()
  }
collectionDetail(){
    this.farmerSvc.collectionDetail(this.collectionId).subscribe((response)=>{
      console.log(this.collectionId);
      this.collectionDetails=response;
      console.log(response)
    })
  }
}
