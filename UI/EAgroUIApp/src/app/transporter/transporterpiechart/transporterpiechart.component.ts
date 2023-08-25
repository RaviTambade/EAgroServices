import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TransporterService } from '../../Services/transporter.service';
import { Transporterrevenue } from 'src/app/Models/transporterrevenue';

@Component({
  selector: 'app-transporterpiechart',
  templateUrl: './transporterpiechart.component.html',
  styleUrls: ['./transporterpiechart.component.css'],
})
export class TransporterpiechartComponent implements OnInit {
  transporterId: number | undefined;
  transporterRevenue: Transporterrevenue[] = [];
  constructor(private svc: TransporterService) {}
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [];

  ngOnInit(): void {
    this.transporterId = Number(localStorage.getItem('transporterId'));
    this.svc.getTransporterRevenue(this.transporterId).subscribe((res) => {
      this.transporterRevenue = res;
      console.log(res);
      this.pieChartData.labels = this.transporterRevenue.map(
        (revenues) => revenues.monthName
      );
      this.pieChartData.datasets[0].data = this.transporterRevenue.map(
        (revenues) => revenues.amount
      );
    });
  }
}
