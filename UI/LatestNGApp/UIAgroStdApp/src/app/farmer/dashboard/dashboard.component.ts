import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { Crop } from 'src/app/Models/crop';
import { CropService } from 'src/app/Services/crop.service';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private cropTimer: any;
  private currentCropIndex: number = 0; 
  crops: Crop[] = [];
  chartIntervals = ["Year", "Quarter", "Month", "Week"];
  years: number[] = [];
  selectedInterval: string = this.chartIntervals[0];
  selectedYear: number = 0;
  totalCollectionCount: number = 0;
  todaysCount: number = 0;
  revenue: number=0;

  constructor(private farmersvc: FarmerService, private cropsvc: CropService) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.fetchRevenueData();

    this.farmersvc.collectionCount().subscribe((count) => {
      this.totalCollectionCount = count;
    });

    this.farmersvc.todayCollectionCount().subscribe((count) => {
      this.todaysCount = count;
    });

    this.cropsvc.todaysRate().subscribe((res: Crop[]) => {
      this.crops = res;
      console.log(res);
    });
    this.farmersvc.totalRevenue().subscribe((totalrevenue)=>{
      this.revenue=totalrevenue;
    });
    this.initCropTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.cropTimer);
  }
  
  initCropTimer(): void {
    this.cropTimer = setInterval(() => {
      this.currentCropIndex = (this.currentCropIndex + 1) % this.crops.length;
    }, 3000); // Change crop image every 3 seconds
  }

  getCurrentCrop(): Crop {
    return this.crops[this.currentCropIndex];
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: this.selectedInterval + ' Amount',
        backgroundColor: 'lightblue',
        borderColor: 'blue',
        pointBackgroundColor: 'blue',
        pointBorderColor: 'blue',
        pointRadius: 0, // Remove point markers on the line
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Amount of Revenue'
        },
        grid: {
          display: false, // Hide y-axis gridlines
        }
      },
      x: {
        title: {
          display: true,
          // text: interval === 'Week' ? 'Days of Week' : (interval === 'Month' ? 'Months' : 'Years')
        },
        grid: {
          display: false, // Hide x-axis gridlines
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
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

  fetchRevenueData() {
    this.lineChartData.datasets[0].label = this.selectedInterval + ' Amount';

    switch (this.selectedInterval) {
      case "Year":
        this.farmersvc.getFarmerYearlyRevenue().subscribe((res) => {
          console.log(res)
          this.lineChartData.labels = res.map(item => item.year);
          this.lineChartData.datasets[0].data = res.map(item => item.amount);
          this.years = res.map(item => item.year);
          this.selectedYear = new Date().getFullYear();
        });
        break;

      case "Quarter":
        this.farmersvc.getFarmerQuarterlyRevenue(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.lineChartData.labels = res.map(item => item.quarter);
          this.lineChartData.datasets[0].data = res.map(item => item.amount);
        });
        break;

      case "Month":
        this.farmersvc.getFarmerMonthlyRevenue(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.lineChartData.labels = res.map(item => item.month);
          this.lineChartData.datasets[0].data = res.map(item => item.amount);
        });
        break;

      case "Week":
        this.farmersvc.getFarmerWeeklyRevenue(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.lineChartData.labels = res.map(item => item.weekNumber);
          this.lineChartData.datasets[0].data = res.map(item => item.amount);
        });
        break;
    }
  }
}
