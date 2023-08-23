
import { Component, OnInit, ViewChild } from '@angular/core';
import { TransporterService } from '../../Services/transporter.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-transporterlinechart',
  templateUrl: './transporterlinechart.component.html',
  styleUrls: ['./transporterlinechart.component.css']
})
export class TransporterlinechartComponent implements OnInit {
  transporterId:any
  chartIntervals = ["Year", "Quarter", "Month", "Week"]
  years:number[]=[]
  selectedInterval: string = this.chartIntervals[0];
  selectedYear: number = new Date().getFullYear();

  constructor(private svc: TransporterService) {
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 500,
        max: 10000,
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
        label: 'vehicles'
      },
    ],
  };

  ngOnInit(): void {
    this.fetchRevenueData()
      }
  
  fetchRevenueData(){
    this.barChartData.datasets[0].label = this.selectedInterval + ' Amount'
    switch (this.selectedInterval) {

      case "Year":
        this.svc.getRevenueByYear().subscribe((res) => {
          console.log(res)
          this.barChartData.labels = res.map(item => item.year);
          this.barChartData.datasets[0].data = res.map(item => item.amount);
          this.years=res.map(item => item.year)
          console.log(this.years)
          this.selectedYear= new Date().getFullYear() ;
        });
        break;

      case "Quarter":
        this.svc.getRevenueByQuarter(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.barChartData.labels = res.map(item => item.quarter);
          this.barChartData.datasets[0].data = res.map(item => item.amount);

        });
        break;
      case "Month":
        this.svc.getRevenueByMonth(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.barChartData.labels = res.map(item => item.month);
          this.barChartData.datasets[0].data = res.map(item => item.amount);
        });
        break;

      case "Week":
        this.svc.getRevenueByWeek(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.barChartData.labels = res.map(item => item.weekNumber);
          this.barChartData.datasets[0].data = res.map(item => item.amount);
        });
        break;
    }
  }

}

