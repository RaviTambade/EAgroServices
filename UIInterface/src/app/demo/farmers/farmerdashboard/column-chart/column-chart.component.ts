import { Component } from '@angular/core';
import { FarmerService } from '../../../../Services/farmer.service';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { Farmer } from 'src/app/Models/farmer';
import { Farmersell } from 'src/app/Models/farmersell';


@Component({
  selector: 'farmer-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss']
})
export class ColumnChartComponent {

  distinctYears: number[];
  farmerTotalAmount: any;
 
  farmer: Farmer | undefined;
  farmerId: string | undefined;
  farmerRevenue: Farmersell[];
  selectedYear: number;


  columnChart = ChartType.ColumnChart;
  // other chart options
  // areaChart = ChartType.AreaChart;
  // barChart = ChartType.BarChart;
  // lineChart = ChartType.LineChart;

  data: any[] = [];

  columnNames = ['month', 'totalAmount'];

  width = 1245;

  height = 500;

  columnoptions = {
    colors: ['brown'],
  };


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
}

