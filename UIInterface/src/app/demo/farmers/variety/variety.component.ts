import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../../../Services/farmer.service';
import { ActivatedRoute } from '@angular/router';
import { VarietyService } from 'src/app/Services/variety.service';
import { Variety } from 'src/app/Models/variety';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.scss']
})
export class VarietyComponent implements OnInit {
  farmerId: string;
  varieties: Variety[] | any = {
    varietyName: '',
    imageUrl: '',
    rate: 0

  }
  constructor(private svc: FarmerService, private route: ActivatedRoute, private varietysvc: VarietyService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((response => {
      this.farmerId = response.get("id");
    }))
    this.varietysvc.getAllVarieties().subscribe((responce) => {
      this.varieties = responce;
      console.log(this.varieties);
    })
  }
}
