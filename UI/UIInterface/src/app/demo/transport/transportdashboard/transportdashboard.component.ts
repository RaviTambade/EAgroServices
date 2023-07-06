import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportService } from '../../../Services/transport.service';
import { ChartType } from 'angular-google-charts';
import { Transport } from 'src/app/Models/transport';

@Component({
  selector: 'app-transportdashboard',
  templateUrl: './transportdashboard.component.html',
  styleUrls: ['./transportdashboard.component.scss']
})
export class TransportdashboardComponent implements OnInit {
  transport: Transport | undefined;
  transportId: string | undefined;


  areaChart = ChartType.AreaChart;
  barChart = ChartType.BarChart;
  columnChart = ChartType.ColumnChart;
  lineChart = ChartType.LineChart;
  pieChart = ChartType.PieChart;

  data: any[] = [];

  columnNames = ['month', 'totalAmount'];

  width = 1200;
  piewidth = 450;

  height = 500;
  pieheight = 140;

  columnoptions = {
    color: ['green'],
  };

  pieoptions = {
    is3D: true
  }

  donutOptions = {
    pieHole: 0.5
  }

  constructor(private svc: TransportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
  }
 
}
