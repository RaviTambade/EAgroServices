import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Cropcount } from '../cropcount';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchantdoughnutchart',
  templateUrl: './merchantdoughnutchart.component.html',
  styleUrls: ['./merchantdoughnutchart.component.css']
})
export class MerchantdoughnutchartComponent implements OnInit {
  merchantId:any;
  cropCounts:Cropcount[]=[]
constructor(private svc:MerchantService){}
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';
ngOnInit(): void {
  this.merchantId=localStorage.getItem("merchantId")
  this.svc.getCropCount(this.merchantId).subscribe((res)=>{
    this.cropCounts=res
    this.doughnutChartData.labels=this.cropCounts.map((c)=>c.cropName);
    this.doughnutChartData.datasets[0].data=this.cropCounts.map((c)=>c.count)
  })
}
 
}

