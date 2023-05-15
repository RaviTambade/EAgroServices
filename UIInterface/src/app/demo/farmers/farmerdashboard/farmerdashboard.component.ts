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
  distinctYears: number[];
  changeGraphByYear() {
    console.log(this.selectedYear)
    let newdata = this.farmerRevenue.filter(item => item.year == this.selectedYear);
    this.data = []
    for (let row in newdata) {
      var month = newdata[row].month
      month = month.slice(0, 3)
      this.data.push([
        month,
        newdata[row].totalAmount,
      ]);
    }
  }
  farmer: Farmer | undefined;
  farmerId: string | undefined;
  farmerRevenue: Farmersell[];
  selectedYear: number;


  areaChart = ChartType.AreaChart;
  barChart = ChartType.BarChart;
  columnChart = ChartType.ColumnChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;

  data: any[] = [];

  columnNames = ['month', 'totalAmount'];

  width = 1245;
  piewidth = 450;

  height = 500;
  pieheight = 140;

  columnoptions = {
    colors: ['brown'],
  };

  pieoptions = {
    is3D: true
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
        this.distinctYears = Array.from(new Set(this.farmerRevenue.map(item => item.year)));
        this.selectedYear = (new Date()).getFullYear();
        for (let row in response) {
          if (response[row].year == this.selectedYear) {
            var month = response[row].month;
            month = month.slice(0, 3)
            this.data.push([
              month,
              response[row].totalAmount,
            ]);
          }
        }
      })
    }
  }
}
