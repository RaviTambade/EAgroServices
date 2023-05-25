import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'angular-google-charts';
import { TransportOrderCount } from 'src/app/Models/transport-order-count';
import { TransportService } from 'src/app/Services/transport.service';

@Component({
  selector: 'transport-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent {

  transportId: string;
  transportOrdersCount: TransportOrderCount[];
  selectedYear: number;
  distinctYears: number[];
  distinctTruckNumbers: string[];
  selectedTruckNumber:string;
  data: any[] = [];


  areaChart = ChartType.ScatterChart;
  width = 500;
  height = 95;

  columnNames = [ 'MONTH','ORDERCOUNT'];


  options = {
    is3D: true,
    backgroundColor: 'silver',
    colors:['brown']
  }


  constructor(private transportsvc: TransportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
    if (this.transportId != undefined) {


      this.transportsvc.transportTruckOrdersPerMonth(this.transportId).subscribe((response) => {
        this.transportOrdersCount = response;
        console.log(response)
        this.distinctYears = Array.from(new Set(this.transportOrdersCount.map(item => item.year)));
        this.distinctTruckNumbers=Array.from(new Set(this.transportOrdersCount.map(item => item.truckNumber)));
        console.log(this.distinctTruckNumbers);
        this.selectedYear = (new Date()).getFullYear();
        this.selectedTruckNumber=this.distinctTruckNumbers[0];
        for (let row in response) {
          if (response[row].year == this.selectedYear && response[row].truckNumber==this.selectedTruckNumber) {
            var month = response[row].month;
            month = month.slice(0, 3)
            this.data.push([
              month,
              response[row].orderCount ,
            ]);
          }
        }
      })
    }
  }
 
  isDataExist():boolean{
    return this.data.length>0;
  }

  changeGraphByYearAndTruckNumber() {
    console.log(this.selectedYear)
    let newdata = this.transportOrdersCount.filter(item => item.year == this.selectedYear && item.truckNumber==this.selectedTruckNumber);
    this.data = []
    for (let row in newdata) {
      var month = newdata[row].month
      month = month.slice(0, 3)
      this.data.push([
        month,
        newdata[row].orderCount,
      ]);
    }
  }
}


