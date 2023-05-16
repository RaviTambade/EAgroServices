import { Component } from '@angular/core';
import { FarmerService } from '../../farmer.service';
import { ActivatedRoute } from '@angular/router';
import { Farmersellvariety } from '../../farmersellvariety';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'farmer-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {


  farmerId: string;
  farmerDataByvariety: Farmersellvariety[];
  selectedYear: number;
  distinctYears: number[];
  data: any[] = [];


  pieChart = ChartType.PieChart;
  pieWidth = 450;
  pieHeight = 135;

  columnNames = ['variety', 'totalAmount'];


  pieOptions = {
    is3D: true,
    backgroundColor: 'rgb(219, 202, 109)',
  }


  constructor(private svc: FarmerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
    if (this.farmerId != undefined) {


      this.svc.getFarmerSellByVariety(this.farmerId).subscribe((response) => {
        this.farmerDataByvariety = response;
        this.distinctYears = Array.from(new Set(this.farmerDataByvariety.map(item => item.year)));
        this.selectedYear = (new Date()).getFullYear();
        for (let row in response) {
          if (response[row].year == this.selectedYear) {
            this.data.push([
              response[row].variety,
              response[row].totalAmount,
            ]);
          }
        }
      })
    }
  }


  changeGraphByYear() {

    let newdata = this.farmerDataByvariety.filter(item => item.year == this.selectedYear);
    this.data = []
    for (let row in newdata) {
      this.data.push([
        newdata[row].variety,
        newdata[row].totalAmount,
      ]);
    }
  }
}
