import { Component } from '@angular/core';
import { FarmerService } from '../../../../Services/farmer.service';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { Farmerorderscount } from '../../../../Models/farmer-orders-count';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent {

  farmerId: string;
  farmerorderscount: Farmerorderscount[];
  selectedYear: number;
  distinctYears: number[];
  data: any[] = [];


  areaChart = ChartType.AreaChart;
  width = 500;
  height = 135;

  columnNames = [ 'MONTH','ORDERCOUNT'];


  options = {
    is3D: true,
    backgroundColor: 'silver',
    colors:['green']
  }


  constructor(private svc: FarmerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
    if (this.farmerId != undefined) {


      this.svc.getFarmerOrdersPerMonth(this.farmerId).subscribe((response) => {
        this.farmerorderscount = response;
        this.distinctYears = Array.from(new Set(this.farmerorderscount.map(item => item.year)));
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

    let newdata = this.farmerorderscount.filter(item => item.year == this.selectedYear);
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
