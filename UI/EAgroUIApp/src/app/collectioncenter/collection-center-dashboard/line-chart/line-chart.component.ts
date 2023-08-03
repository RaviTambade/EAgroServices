import { Component, OnInit, ViewChild } from '@angular/core';

import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { CollectioncenterService } from 'src/app/collectioncenter.service';

@Component({
  selector: 'collectioncenter-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  
    constructor(private svc:CollectioncenterService) {
      Chart.register(Annotation);
    }
  
    public lineChartData: ChartConfiguration['data'] = {
      datasets: [
        {
          data: [],
          // stepped:true,
          label: 'Monthly Amount',
          backgroundColor: 'lightblue',
          borderColor: 'blue',
          pointBackgroundColor: 'blue',
          pointBorderColor: 'blue',
          pointRadius:5,
          pointBorderWidth:2,
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
    this.svc.getMonthRevenue().subscribe((res) => {
      console.log(res)
      this.lineChartData.labels = res.map(item => item.month);
      this.lineChartData.datasets[0].data = res.map(item => item.totalAmount);
    });
  }
}
