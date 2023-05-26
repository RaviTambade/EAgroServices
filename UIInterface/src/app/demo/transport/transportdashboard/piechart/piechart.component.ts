import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { TransportService } from '../../../../Services/transport.service';
import { ActivatedRoute } from '@angular/router';
import { TransportTruckdetails } from 'src/app/Models/transport-truckdetails';

@Component({
  selector: 'transport-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent {


  transportId: string;
  truckDataByTruckNo:TransportTruckdetails[];
  selectedYear: number;
  distinctYears: number[];
  data: any[] = [];


  pieChart = ChartType.PieChart;
  pieWidth = 450;
  pieHeight = 135;

  columnNames = ['truckNumber', 'totalFreightCharges'];


  pieOptions = {
    is3D: true,
    backgroundColor: 'rgb(219, 202, 109)',
  }


  constructor(private svc: TransportService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.transportId = params.get('id');
    });
    if (this.transportId != undefined) {


      this.svc.transportTrucktHistoryByYear(this.transportId).subscribe((response) => {
        this.truckDataByTruckNo = response;
        this.distinctYears = Array.from(new Set(this.truckDataByTruckNo.map(item => item.year)));
        this.selectedYear = (new Date()).getFullYear();
        for (let row in response) {
          if (response[row].year == this.selectedYear) {
            this.data.push([
              response[row].truckNumber,
              response[row].totalFreightCharges,
            ]);
          }
        }
      })
    }
  }
  isDataExist(): boolean {
    return this.data.length > 0;
  }

  changeGraphByYear() {

    let newdata = this.truckDataByTruckNo.filter(item => item.year == this.selectedYear);
    this.data = []
    for (let row in newdata) {
      this.data.push([
        newdata[row].truckNumber,
        newdata[row].totalFreightCharges,
      ]);
    }
  }

}
