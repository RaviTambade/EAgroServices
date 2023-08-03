import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { FarmerRevenue } from '../farmer-revenue';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-transporterpiechart',
  templateUrl: './transporterpiechart.component.html',
  styleUrls: ['./transporterpiechart.component.css']
})
export class TransporterpiechartComponent implements OnInit {
  farmerId:any;
farmerRevenue:FarmerRevenue[]=[]
  constructor(private svc:FarmerService){}
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins =  [];

  ngOnInit(): void {
    this.farmerId = Number(localStorage.getItem("transporterId"));
    this.svc.getMonthlyRevenue(this.farmerId).subscribe((res)=>{
this.farmerRevenue=res
console.log(res)
this.pieChartData.labels=this.farmerRevenue.map((revenues)=>revenues.monthName);
this.pieChartData.datasets[0].data=this.farmerRevenue.map((revenues)=>revenues.totalAmount);
    })
  }
}
