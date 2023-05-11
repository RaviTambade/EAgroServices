import { Component, OnInit } from '@angular/core';
import { Farmer } from '../farmer';
import { FarmerService } from '../farmer.service';
import { Farmersell } from '../farmersell';
import { ChartType } from 'angular-google-charts';
import { ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './farmerdashboard.component.html',
  styleUrls: ['./farmerdashboard.component.scss']
})
export class FarmerDashboardComponent implements OnInit {
  farmer: Farmer | undefined;
  farmerId:string | undefined ;
  farmerRevenue: Farmersell[];

  areaChart = ChartType.AreaChart;
  barChart = ChartType.BarChart;
  columnChart = ChartType.ColumnChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;

  data: any[] = [];

  columnNames = ['month', 'totalAmount'];

  width = 1000;
  piewidth=555;

  height =500;
  pieheight=222;

  columnoptions={
      colors: ['#3366CC', '#DC3912'],
  };

  donutOptions = {
    pieHole: 0.5
  }
  constructor(private svc: FarmerService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      console.log(params)
      this.farmerId=params.get('id');
    });
    if (this.farmerId != undefined) {

      this.svc.getFarmerRevenue(this.farmerId).subscribe((response) => {
        this.farmerRevenue = response;
        console.log(this.farmerRevenue);

        for (let row in response) {
          // var chart = new google.visualization.BarChart(document.getElementById('visualization'));
          // chart.draw(month, {width: 400, height: 240, title: 'Company Performance',
          //                   vAxis: {title: 'Year', titleTextStyle: {color: 'red'}},
          //                   series: [{color: 'blue', visibleInLegend: true}, {color: 'red', visibleInLegend: false}]
          //                  });
          var month=response[row].month
          month=month.slice(0,3)
          this.data.push([
            month,
            response[row].totalAmount,
          ]);
        }
      })
    }
  }

}
