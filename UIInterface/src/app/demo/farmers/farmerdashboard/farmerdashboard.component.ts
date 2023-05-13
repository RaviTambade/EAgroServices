import { Component, OnInit } from '@angular/core';
import { Farmer } from '../farmer';
import { FarmerService } from '../farmer.service';
import { Farmersell } from '../farmersell';
import { ChartType } from 'angular-google-charts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './farmerdashboard.component.html',
  styleUrls: ['./farmerdashboard.component.scss']
})
export class FarmerDashboardComponent implements OnInit {
  farmer: Farmer | undefined;
  farmerId: string | undefined;
  farmerRevenue: Farmersell[];

  areaChart = ChartType.AreaChart;
  barChart = ChartType.BarChart;
  columnChart = ChartType.ColumnChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;

  data: any[] = [];

  columnNames = ['month', 'totalAmount'];

  width = 1100;
  piewidth = 450;

  height = 500;
  pieheight = 140;

   columnoptions = {
     color:['green'],
  };

  pieoptions={
    is3D:true
  }

  donutOptions = {
    pieHole: 0.5
  }
  constructor(private svc: FarmerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
    if (this.farmerId != undefined) {

      this.svc.getFarmerRevenue(this.farmerId).subscribe((response) => {
        this.farmerRevenue = response;
        console.log(this.farmerRevenue);

        for (let row in response) {
          var month = response[row].month
          month = month.slice(0, 3)
          this.data.push([
            month,
            response[row].totalAmount,
          ]);
        } 
      })
    }
  }

}
