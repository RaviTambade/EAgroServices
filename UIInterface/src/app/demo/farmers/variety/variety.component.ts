import { Component, OnInit } from '@angular/core';
import { Variety } from '../variety';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.scss']
})
export class VarietyComponent implements OnInit {
  farmerId:string;
  varieties:Variety [] | any={
    varietyName: '',
    imageUrl:'',
    rate:0
    
  }
  constructor(private svc:FarmerService, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((response=>{
      this.farmerId=response.get("id");
    }))
    this.svc.getAllVarieties().subscribe((responce)=>{
this.varieties=responce;
console.log(this.varieties);
    })
  }

  }

