import { Component, OnInit } from '@angular/core';
import { Farmer } from '../farmer';
import { FarmerService } from '../farmer.service';
import { Farmersell } from '../farmersell';
import { ChartType } from 'angular-google-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  farmer: Farmer | undefined;
  farmerId: | number = 2;
  farmerRevenue: Farmersell[];

  areaChart = ChartType.AreaChart;
  barChart = ChartType.BarChart;
  columnChart = ChartType.ColumnChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;

  data: any[] = [];

  columnNames = ['month', 'totalAmount'];

  width = 1500;

  height =500;

  donutOptions = {
    pieHole: 0.5
  }
  constructor(private svc: FarmerService) { }

  ngOnInit(): void {
    if (this.farmerId != undefined) {
      this.svc.getFarmer(this.farmerId).subscribe((response) => {
        this.farmer = response;
        console.log(this.farmer);
      });

      this.svc.getFarmerRevenue(this.farmerId).subscribe((response) => {
        this.farmerRevenue = response;
        console.log(this.farmerRevenue);

        for (let row in response) {
          this.data.push([
            response[row].month,
            response[row].totalAmount,
          ]);
        }
      })
    }
  }

}
