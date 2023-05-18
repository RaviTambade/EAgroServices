import { Component } from '@angular/core';
import { Transport } from '../../transport';
import { ChartType } from 'angular-google-charts';
import { TransportService } from '../../transport.service';
import { ActivatedRoute } from '@angular/router';
import { TransportTruckdetails } from '../../transport-truckdetails';

@Component({
  selector: 'transport-columnchart',
  templateUrl: './columnchart.component.html',
  styleUrls: ['./columnchart.component.scss']
})
export class ColumnchartComponent {


  distinctYears: number[];
  distinctTruckNumbers: string[];
  transportId: string | undefined;
  transportData:TransportTruckdetails[];
  selectedYear: number;
  selectedTruckNumber:string;

  columnChart = ChartType.ColumnChart;
 

  data: any[] = [];

  columnNames = ['month', 'Amount'];

  width = 1245;

  height = 500;

  columnoptions = {
    colors: ['brown'],
  };



  constructor(private svc: TransportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId= params.get('id');
    });
    if (this.transportId != undefined) {

        this.svc.transportTrucktHistory(this.transportId).subscribe((response) => {
        this.transportData = response;
        console.log(response)
        this.distinctYears = Array.from(new Set(this.transportData.map(item => item.year)));
        this.distinctTruckNumbers=Array.from(new Set(this.transportData.map(item => item.truckNumber)));
        console.log(this.distinctTruckNumbers);
        this.selectedYear = (new Date()).getFullYear();
        this.selectedTruckNumber=this.distinctTruckNumbers[0];
        for (let row in response) {
          if (response[row].year == this.selectedYear && response[row].truckNumber==this.selectedTruckNumber) {
            var month = response[row].month;
            month = month.slice(0, 3)
            this.data.push([
              month,
              response[row].totalFreightCharges,
            ]);
          }
        }
      })
    }
  }

  changeGraphByYearAndTruckNumber() {
    console.log(this.selectedYear)
    let newdata = this.transportData.filter(item => item.year == this.selectedYear && item.truckNumber==this.selectedTruckNumber);
    this.data = []
    for (let row in newdata) {
      var month = newdata[row].month
      month = month.slice(0, 3)
      this.data.push([
        month,
        newdata[row].totalFreightCharges,
      ]);
    }
  }
}




