import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { Merchant } from '../../pages/authentication/merchant';
import { MerchantService } from '../merchant.service';
import { Merchantrevenue } from '../merchantrevenue';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.scss']
})
export class MerchantDashboardComponent {
  merchant: Merchant | undefined;
  merchantId: string | undefined;
  merchantRevenue: Merchantrevenue[];

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
     color:['green'],
  };

  pieoptions={
    is3D:true
  }

  donutOptions = {
    pieHole: 0.5
  }
  constructor(private svc: MerchantService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
    });
    if (this.merchantId != undefined) {

      this.svc.getMerchantRevenue(this.merchantId).subscribe((response) => {
        this.merchantRevenue = response;
        console.log("service is called")
        console.log(this.merchantRevenue);

        for (let row in response) {
          var month = response[row].month
          month = month.slice(0, 3)
          this.data.push([
            month,
            response[row].totalAmount,
          ]);
        } 
      })
    }
  }
}
