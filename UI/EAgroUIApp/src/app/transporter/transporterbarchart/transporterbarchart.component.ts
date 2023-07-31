import { AbstractType, Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective  } from 'ng2-charts';
import { TransporterService } from '../transporter.service';
import { Vehiclerevenue } from '../vehiclerevenue';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-transporterbarchart',
  templateUrl: './transporterbarchart.component.html',
  styleUrls: ['./transporterbarchart.component.css']
})
export class TransporterbarchartComponent implements OnInit{
  transporterId:any;
  vehicleRevenues:Vehiclerevenue[]=[]
  constructor(private svc:TransporterService){}
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 500,
        max:5000,
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
      { data: [], label: 'Vehicle' },
    ],
  };

  
  ngOnInit(): void {
    this.transporterId = Number(localStorage.getItem("transporterId"));
    this.svc.getVehicleRevenues(this.transporterId).subscribe((res)=>{
this.vehicleRevenues=res
console.log(res)
this.barChartData.labels=this.vehicleRevenues.map((revenues)=>revenues.rtoNumber);
this.barChartData.datasets[0].data=this.vehicleRevenues.map((revenues)=>revenues.amount);
    })
  }

}
