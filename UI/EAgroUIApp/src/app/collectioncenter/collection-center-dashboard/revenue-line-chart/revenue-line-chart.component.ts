import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { BIServiceService } from 'src/app/biservice.service';
@Component({
  selector: 'app-revenue-line-chart',
  templateUrl: './revenue-line-chart.component.html',
  styleUrls: ['./revenue-line-chart.component.css']
})
export class RevenueLineChartComponent implements OnInit {

  chartIntervals = ["Year", "Quarter", "Month", "Week"]
  years:number[]=[]
  selectedInterval: string = this.chartIntervals[0];
  selectedYear: number = 0;

  constructor(private svc: BIServiceService) {
    Chart.register(Annotation);
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        // stepped:true,
        label: this.selectedInterval + ' Amount',
        backgroundColor: 'lightblue',
        borderColor: 'blue',
        pointBackgroundColor: 'blue',
        pointBorderColor: 'blue',
        pointRadius: 5,
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.7,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',

        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            borderColor: 'black',
            borderWidth: 2,
            label: {
              position: 'center',
              color: 'black',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    this.fetchRevenueData();
  }
  fetchRevenueData() {
    this.lineChartData.datasets[0].label = this.selectedInterval + ' Amount'

    switch (this.selectedInterval) {

      case "Year":
        this.svc.getCollectionCenterYearlyRevenue().subscribe((res) => {
          console.log(res)
          this.lineChartData.labels = res.map(item => item.year);
          this.lineChartData.datasets[0].data = res.map(item => item.amount);
          this.years=res.map(item => item.year)
          this.selectedYear= new Date().getFullYear() ;
        });
        break;

      case "Quarter":
        this.svc.getCollectionCenterQuarterlyRevenue(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.lineChartData.labels = res.map(item => item.quarter);
          this.lineChartData.datasets[0].data = res.map(item => item.amount);

        });
        break;
      case "Month":
        this.svc.getCollectionCenterMonthlyRevenue(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.lineChartData.labels = res.map(item => item.month);
          this.lineChartData.datasets[0].data = res.map(item => item.amount);
        });
        break;

      case "Week":
        this.svc.getCollectionCenterWeeklyRevenue(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.lineChartData.labels = res.map(item => item.weekNumber);
          this.lineChartData.datasets[0].data = res.map(item => item.amount);
        });
        break;

    }
  }
}
