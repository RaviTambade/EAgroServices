import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MerchantService } from 'src/app/Services/merchant.service';
import { Collectioncount } from 'src/app/Models/collectioncount';
import { CorporateService } from 'src/app/Services/corporate.service';


@Component({
  selector: 'app-merchantbarchart',
  templateUrl: './merchantbarchart.component.html',
  styleUrls: ['./merchantbarchart.component.css']
})
export class MerchantbarchartComponent {
  merchantId: any;
  collectionCount: Collectioncount[] = []
  constructor(private svc: MerchantService, private crpSvc: CorporateService) { }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,

    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 5,
        max: 40,
        ticks: {
          stepSize: 5,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'collections count'
      },
    ],
  };


  ngOnInit(): void {
    this.merchantId = Number(localStorage.getItem("merchantId"));
    this.svc.getCollectionCount(this.merchantId).subscribe((res) => {
      this.collectionCount = res
      console.log(res)
      let distinctCorporateIds = this.collectionCount.map(crp => crp.corporateId);
      let crpId = distinctCorporateIds.join(',');
      this.crpSvc.getCorporates(crpId).subscribe((names) => {
        console.log(names)
        let corporationNames = names
        this.collectionCount.forEach(item => {
          let matchingItem = corporationNames.find(element => element.id === item.corporateId);
          if (matchingItem != undefined)
            item.companyName = matchingItem.name;

          this.barChartData.labels = this.collectionCount.map((revenues) => revenues.companyName);
          console.log(matchingItem)
        });
      });
      this.barChartData.datasets[0].data = this.collectionCount.map((revenues) => revenues.count);
    })
  }

  getBarColors(dataLength: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < dataLength; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }
  getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
