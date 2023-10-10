import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
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
  months = ['january', 'Feb', 'march', 'april', 'may'];
  chart: any;
  totalCollectionCount: number = 0;
  todaysCount: number = 0;

  constructor(private farmersvc: FarmerService, private cropsvc: CropService) { }

  ngOnInit(): void {
    this.updateChart('Week');

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


  updateChart(interval: string, selectedOption?: string): void {
    let labels: string[];
    let data: number[];

    if (interval === 'Year') {
      // Handle the selected year, e.g., selectedOption will be '2022', '2021', etc.
      labels = ['Year 1', 'Year 2', 'Year 3']; // Customize labels for years
      data = [5000, 6000, 7000]; // Example data for years
    } else if (interval === 'Month') {
      // Handle the selected month, e.g., selectedOption will be 'January', 'February', etc.
      labels = ['Month 1', 'Month 2', 'Month 3']; // Customize labels for months
      data = [200, 300, 250]; // Example data for months
    } else {
      labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
      data = [100, 200, 150, 300, 250, 400, 350];
    }

    if (this.chart) {
      this.chart.destroy(); // Destroy the existing chart if it exists
    }

    // Create the new chart
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: data,
          borderColor: 'blue',
          borderWidth: 2,
          fill: true,
          cubicInterpolationMode: 'monotone',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
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
              text: interval === 'Week' ? 'Days of Week' : (interval === 'Month' ? 'Months' : 'Years')
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
        }
      }
    });

  }

}


