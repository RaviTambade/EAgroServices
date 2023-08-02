
import { Component, OnInit, ViewChild } from '@angular/core';
import { Shipmentcount } from '../shipmentcount';
import { TransporterService } from '../transporter.service';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-transporterlinechart',
  templateUrl: './transporterlinechart.component.html',
  styleUrls: ['./transporterlinechart.component.css']
})
export class TransporterlinechartComponent implements OnInit {
  transporterId:any;
  shipmentCount:Shipmentcount[]=[]
  private newLabel? = 'New label';
  
    constructor(private svc:TransporterService) {
      Chart.register(Annotation);
    }
  
    public lineChartData: ChartConfiguration['data'] = {
      datasets: [
        {
          data: [],
          label: 'Shipment count',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
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
          tension: 0.5,
        },
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        y: {
          position: 'left',
        },
        y1: {
          position: 'right',
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
              value: 'March',
              borderColor: 'orange',
              borderWidth: 2,
              label: {
                position: 'center',
                color: 'orange',
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
    this.transporterId=localStorage.getItem("transporterId")
      this.svc.getShipmentsCount(this.transporterId).subscribe((res)=>{
        this.shipmentCount=res
        this.lineChartData.labels=this.shipmentCount.map(s=>s.monthName);
        this.lineChartData.datasets[0].data=this.shipmentCount.map(s=>Number(s.count));
      })
  }
}
