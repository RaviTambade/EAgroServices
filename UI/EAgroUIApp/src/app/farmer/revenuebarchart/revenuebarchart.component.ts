import { AbstractType, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective  } from 'ng2-charts';
import 'chartjs-plugin-datalabels';
import { FarmerRevenue } from '../farmer-revenue';
import { FarmerService } from '../farmer.service';
@Component({
  selector: 'app-revenuebarchart',
  templateUrl: './revenuebarchart.component.html',
  styleUrls: ['./revenuebarchart.component.css']
})
  export class RevenuebarchartComponent implements OnInit{
    farmerId=2;
    FarmerRevenues:FarmerRevenue[]=[]
    constructor(private svc:FarmerService){}
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
    public barChartOptions: ChartConfiguration['options'] = {
      responsive: true,
  
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        x: {},
        y: {
          min: 500,
          max:10000,
          ticks: {
            stepSize: 500,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
        },
      },
    };
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [];
  
    public barChartData: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          data: [],
          label: 'Monthly Revenue'
        },
      ],
    };
  
    
    ngOnInit(): void {
      // this.farmerId = Number(localStorage.getItem("farmerId"));
      this.svc.getMonthlyRevenue(this.farmerId).subscribe((res)=>{
  this.FarmerRevenues=res
  console.log(res)
  this.barChartData.labels=this.FarmerRevenues.map((revenues)=>revenues.monthName);
  this.barChartData.datasets[0].data=this.FarmerRevenues.map((revenues)=>revenues.totalAmount);
  this.barChartData.datasets[0].backgroundColor = this.getBarColors(this.FarmerRevenues.length);
      })
    }
  
    getBarColors(dataLength: number): string[] {
      const colors: string[] = [];
      for (let i = 0; i < dataLength; i++) {
        colors.push(this.getRandomColor());
      }
      return colors;
    }
  getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  }


