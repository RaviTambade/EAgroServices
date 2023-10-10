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
  chart: any;

   constructor() { }

//   ngOnInit(): void {
//     this.initCropTimer();
//     this.initChart('Week'); // Initialize the chart with 'Week' as the default interval
//   }

//   ngOnDestroy(): void {
//     clearInterval(this.cropTimer);
//   }

  initCropTimer(): void {
    this.cropTimer = setInterval(() => {
      this.currentCropIndex = (this.currentCropIndex + 1) % this.crops.length;
    }, 3000); // Change crop image every 3 seconds
  }

//   initChart(interval: string): void {
//     // Hardcoded data for demonstration purposes
//     const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
//     const data = [100, 200, 150, 300, 250, 400, 350];

//     // Create the chart
//     const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
//     const chart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: interval === 'Week' ? labels : ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//         datasets: [{
//           label: 'Revenue',
//           data: data,
//           borderColor: 'blue',
//           borderWidth: 2,
//           fill: false
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Amount of Revenue'
//             }
//           },
//           x: {
//             title: {
//               display: true,
//               text: interval === 'Week' ? 'Days of Week' : 'Weeks of Month'
//             }
//           }
//         }
//       }
//     });
//   }
//   getCurrentCrop(): { name: string, rate: number, image: string } {
//     return this.crops[this.currentCropIndex];
// }
// }


ngOnInit(): void {
  this.initCropTimer();
  this.updateChart('Week'); // Initialize the chart with 'Week' as the default interval
}

ngOnDestroy(): void {
  clearInterval(this.cropTimer);
}

// ... (Existing code for initCropTimer and getCurrentCrop) ...

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
