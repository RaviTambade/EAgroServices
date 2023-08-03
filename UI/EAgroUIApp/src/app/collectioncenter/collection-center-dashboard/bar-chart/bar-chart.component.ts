import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CollectioncenterService } from 'src/app/collectioncenter.service';


@Component({
  selector: 'collectioncenter-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  constructor(private svc: CollectioncenterService) { }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        
      },
      y: {
        
        // min: 500,
        // max: 10000,
        ticks: {
          // stepSize: 500,
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
        // barThickness:50,
        data: [],
        label: ' Crop Amount'
      },
    ],
  };


  ngOnInit(): void {
    this.svc.getCropRevenue().subscribe((res) => {
      console.log(res)
      this.barChartData.labels = res.map(item => item.cropName);
      this.barChartData.datasets[0].data = res.map(item => item.totalAmount);
      this.barChartData.datasets[0].backgroundColor = this.getBarColors(res.length);
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
