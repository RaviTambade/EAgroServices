import { Component, OnInit } from '@angular/core';
import { Farmer } from 'src/app/vendors/farmer';
import { CollectionService } from '../collection.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-farmerdetails',
  templateUrl: './farmerdetails.component.html',
  styleUrls: ['./farmerdetails.component.css']
})
export class FarmerdetailsComponent implements OnInit {
farmer:Farmer|any;
farmerId:any;
constructor(private svc:CollectionService,private route:ActivatedRoute){}
  ngOnInit(): void {
   this.farmerId=this.route.snapshot.paramMap.get('id')
    this.svc.getfarmer(this.farmerId).subscribe((response)=>{
      this.farmer=response;
      console.log(response);
    })
  }
  

}
