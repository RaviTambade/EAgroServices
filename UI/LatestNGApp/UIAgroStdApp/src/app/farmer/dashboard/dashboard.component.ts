import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  private cropTimer: any; // Timer for changing crop images
  private currentCropIndex: number = 0; // Index of the currently displayed crop
  private crops: { name: string, rate: number, image: string }[] = [
    { name: 'Crop 1', rate: 10, image: 'crop1.jpg' },
    { name: 'Crop 2', rate: 15, image: 'crop2.jpg' },
    { name: 'Crop 3', rate: 20, image: 'crop3.jpg' }
    // Add more crops here with their rates and image paths
  ];

  constructor() { }

  ngOnInit(): void {
    this.initCropTimer();
    this.initChart('Week'); // Initialize the chart with 'Week' as the default interval
  }

  ngOnDestroy(): void {
    clearInterval(this.cropTimer);
  }

  initCropTimer(): void {
    this.cropTimer = setInterval(() => {
      this.currentCropIndex = (this.currentCropIndex + 1) % this.crops.length;
    }, 3000); // Change crop image every 3 seconds
  }

  initChart(interval: string): void {
    // Hardcoded data for demonstration purposes
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const data = [100, 200, 150, 300, 250, 400, 350];

    // Create the chart
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: interval === 'Week' ? labels : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Revenue',
          data: data,
          borderColor: 'blue',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount of Revenue'
            }
          },
          x: {
            title: {
              display: true,
              text: interval === 'Week' ? 'Days of Week' : 'Weeks of Month'
            }
          }
        }
      }
    });
  }
  getCurrentCrop(): { name: string, rate: number, image: string } {
    return this.crops[this.currentCropIndex];
}
}
