import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'farmer-dashboard',
  templateUrl: './farmerdashboard.component.html',
  styleUrls: ['./farmerdashboard.component.scss']
})
export class FarmerDashboardComponent implements OnInit {
  farmerTotalAmount: any;
  farmerId: string | undefined;
  
  constructor(private svc: FarmerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
    if (this.farmerId != undefined) {

      this.svc.getFarmerTotalAmont(this.farmerId).subscribe((response) => {
        this.farmerTotalAmount = response;
    });
    }
  }
}