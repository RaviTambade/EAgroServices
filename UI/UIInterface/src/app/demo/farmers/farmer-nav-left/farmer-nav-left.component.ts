import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Farmer } from 'src/app/Models/farmer';
import { FarmerService } from 'src/app/Services/farmer.service';


@Component({
  selector: 'app-farmer-nav-left',
  templateUrl: './farmer-nav-left.component.html',
  styleUrls: ['./farmer-nav-left.component.scss']
})
export class FarmerNavLeftComponent {
  farmerId:any;
  farmer:Farmer;
  constructor( private route: ActivatedRoute, private farmersvc:FarmerService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.farmerId = params.get('id');
    });
    this.farmersvc.getFarmer(this.farmerId).subscribe((response)=>{
      this.farmer=response;
      console.log(this.farmer);
    })
  }
}

