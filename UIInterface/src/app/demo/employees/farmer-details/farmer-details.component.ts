import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { right } from '@popperjs/core';
import { Farmer } from '../../farmers/farmer';
import { FarmerService } from '../../farmers/farmer.service';

@Component({
  selector: 'app-farmer-details',
  templateUrl: './farmer-details.component.html',
  styleUrls: ['./farmer-details.component.scss']
})
export class FarmerDetailsComponent implements OnInit{
 //  @Input() selectedUser: any;
  @Input() farmer: |any;
  farmerId:string ;
  constructor(private route:ActivatedRoute,private svc:FarmerService){}

ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
  })
  this.svc.getFarmer(this.farmerId).subscribe((response)=>{
    this.farmer=response
  })
}
}

