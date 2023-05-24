import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { MerchantService } from '../../../Services/merchant.service';
import { Merchantrevenue } from '../../../Models/merchantrevenue';
import { Merchant } from 'src/app/Models/merchant';
import { Merchantordercount } from 'src/app/Models/merchantordercount';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.scss']
})
export class MerchantDashboardComponent {
  merchant: Merchant | undefined;
  merchantId: string | undefined;
  merchantRevenue: Merchantrevenue[];
  merchantOrderCount:Merchantordercount[];
  totalPurchaseAmount:number;
  distinctYears:number[];
  selectedYear:number;

  
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
  
  options = {
    is3D: true,
    backgroundColor: 'silver',
    colors:['green']
  }

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

    this.svc.getTotalPurchaseAmount(this.merchantId).subscribe((response)=>{
      this.totalPurchaseAmount=response
    })

    if (this.merchantId != undefined) {


      this.svc.getTotalPurchaseOrderCount(this.merchantId).subscribe((response) => {
        this.merchantOrderCount = response;
        this.distinctYears = Array.from(new Set(this.merchantOrderCount.map(item => item.year)));
        this.selectedYear = (new Date()).getFullYear();
        for (let row in response) {
          if (response[row].year == this.selectedYear) {
            var month = response[row].month;
            month = month.slice(0, 3)
            this.data.push([
              month,
              response[row].orderCount +Math.random(),
            ]);
          }
        }
      })
    }
  }
  changeGraphByYear() {

    let newdata = this.merchantOrderCount.filter(item => item.year == this.selectedYear);
    this.data = []
    for (let row in newdata) {
      var month = newdata[row].month
      month = month.slice(0, 3)
      this.data.push([
        month,
        newdata[row].orderCount+Math.random(),
      ]);
    }
  }
}

