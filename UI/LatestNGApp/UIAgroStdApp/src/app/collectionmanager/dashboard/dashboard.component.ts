import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { CropQuantity } from 'src/app/Models/cropquantity';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todaysCollection: number = 0;
  totalCollection: number = 0;
  cropQuantity: CropQuantity[] = [];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      x: {
        display: false, // Hide the x-axis
      },
      y: {
        display: false, // Hide the y-axis
       
      },
    },
    plugins: {
      title: {
        display: false, // Hide the title
        position: 'left',
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adjust the curve of the line
        borderColor: 'white', // Line color
        borderWidth: 2, // Line width
        // fill: true, // Fill the area under the line
        // backgroundColor: 'rgba(255, 255, 255, 0.2)', // Area under the line color
      },
    },
  };
  public lineChartLabels: string[] = [];
  public lineChartType: ChartType = 'line';
  public lineChartLegend: boolean = true;
  public lineChartData: any[] = [];

  constructor(private collectionmanager: CollectionmanagerService) { }

  ngOnInit(): void {
    this.collectionmanager.getCollectionCenterId().subscribe((collectionCenterId) => {
      this.collectionmanager.todayCollectionCount(collectionCenterId).subscribe((count) => {
        this.todaysCollection = count;
        this.collectionmanager.collectionCount(collectionCenterId).subscribe((totalcount) => {
          this.totalCollection = totalcount;
        });
        this.collectionmanager.totalCropQuantity(collectionCenterId).subscribe((response) => {
          this.cropQuantity = response;
          this.lineChartLabels = this.cropQuantity.map((item) => item.cropName);
          this.lineChartData = [{ data: this.cropQuantity.map((item) => item.totalWeight), label: '',pointStyle: 'remove' }];
        });
      });
    });
  }
}
