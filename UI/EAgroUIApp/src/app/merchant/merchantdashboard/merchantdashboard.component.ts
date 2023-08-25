import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { Merchantcollectioncount } from 'src/app/Models/merchantcollectioncount';
import { MerchantcollectioncountMonth } from 'src/app/Models/merchantcollectioncount-month';
import { MerchantcollectioncountQuarter } from 'src/app/Models/merchantcollectioncount-quarter';
import { MerchantcollectioncountWeek } from 'src/app/Models/merchantcollectioncount-week';
import { WeekDate } from 'src/app/Models/week-date';
import { BIService } from 'src/app/Services/biservice.service';
import { CorporateService } from 'src/app/Services/corporate.service';
import { RevenueDateService } from 'src/app/Services/revenue-date-service.service';

@Component({
  selector: 'app-merchantdashboard',
  templateUrl: './merchantdashboard.component.html',
  styleUrls: ['./merchantdashboard.component.css']
})
export class MerchantdashboardComponent implements OnInit {
merchantCollectionCount:Merchantcollectioncount[]=[];
merchantCollectionCountMonth:MerchantcollectioncountMonth[]=[];
merchantCollectionCountQuarter:MerchantcollectioncountQuarter[]=[];
merchantCollectionCountWeek:MerchantcollectioncountWeek[]=[];

chartIntervals = ["Year", "Quarter", "Month", "Week"]
years:number[]=[]
selectedInterval: string = this.chartIntervals[0];
selectedYear: number = 0;
selectedWeek: number = 1;
selectedQuarter: number;
selectedMonth: string;
months: string[] | undefined;
quarters: number[] | undefined;
weeks: WeekDate[] = []
constructor(private bisvc:BIService,private crpSvc:CorporateService,private datesvc: RevenueDateService){Chart.register(Annotation);
this.months = datesvc.getMonths();
this.selectedMonth = this.months[0];
this.quarters = datesvc.getQuarters();
this.selectedQuarter = this.quarters[0];
}
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
      this.bisvc.getYearOfCollection().subscribe((response) => {
        this.years = response;
        if (this.years.length > 0) {
          this.selectedYear = this.years[0];
      this.fetchRevenueData();
        }
    })
  }
    fetchRevenueData(){
      this.barChartData.datasets[0].label = this.selectedInterval + 'Count'

    switch (this.selectedInterval) {

      case "Year":
    this.bisvc.getCollectionCenterCountByYear(this.selectedYear).subscribe((response)=>{
      this.merchantCollectionCount=response
      console.log(response);
      // this.years=response.map(item => item.year)
      //       this.selectedYear= new Date().getFullYear() ;
            console.log(this.years);
      let distinctCorporateIds = this.merchantCollectionCount.map(crp => crp.collectionCenterId);
      let crpId = distinctCorporateIds.join(',');
      this.crpSvc.getCorporates(crpId).subscribe((names) => {
        console.log(names)
        let corporationNames = names
        this.merchantCollectionCount.forEach(item => {
          let matchingItem = corporationNames.find(element => element.id === item.collectionCenterId  );
          if (matchingItem != undefined)
            item.companyName = matchingItem.name;
            

          this.barChartData.labels = this.merchantCollectionCount.map((revenues) => revenues.companyName);
          console.log(matchingItem)
        });
      });
      this.barChartData.datasets[0].data = this.merchantCollectionCount.map((revenues) => revenues.count);
    })
    this.weeks = this.datesvc.getWeeks(this.selectedYear);
    break;

      case "Quarter":
        this.bisvc.getCollectionCenterCountByQuarter(this.selectedYear,this.selectedQuarter).subscribe((response)=>{
          this.merchantCollectionCountQuarter=response
          console.log(response);
          let distinctCorporateIds = this.merchantCollectionCount.map(crp => crp.collectionCenterId);
          let crpId = distinctCorporateIds.join(',');
          this.crpSvc.getCorporates(crpId).subscribe((names) => {
            console.log(names)
            let corporationNames = names
            this.merchantCollectionCount.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.collectionCenterId  );
              if (matchingItem != undefined)
                item.companyName = matchingItem.name;
    
              this.barChartData.labels = this.merchantCollectionCount.map((revenues) => revenues.companyName);
              console.log(matchingItem)
            });
          });
          this.barChartData.datasets[0].data = this.merchantCollectionCount.map((revenues) => revenues.count);
        })
        break;
        case "Month":

        this.bisvc.getCollectionCenterCountByMonth(this.selectedYear,this.selectedMonth).subscribe((response)=>{
          this.merchantCollectionCountMonth=response
          console.log(response);
          let distinctCorporateIds = this.merchantCollectionCount.map(crp => crp.collectionCenterId);
          let crpId = distinctCorporateIds.join(',');
          this.crpSvc.getCorporates(crpId).subscribe((names) => {
            console.log(names)
            let corporationNames = names
            this.merchantCollectionCount.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.collectionCenterId  );
              if (matchingItem != undefined)
                item.companyName = matchingItem.name;
    
              this.barChartData.labels = this.merchantCollectionCount.map((revenues) => revenues.companyName);
              console.log(matchingItem)
            });
          });
          this.barChartData.datasets[0].data = this.merchantCollectionCount.map((revenues) => revenues.count);
        })

//         break;

//         case "Week":
//           this.bisvc.getCollectionCenterCountByWeek(this.selectedYear).subscribe((response)=>{
//             this.merchantCollectionCountWeek=response
//             console.log(response);
//             let distinctCorporateIds = this.merchantCollectionCount.map(crp => crp.collectionCenterId);
//             let crpId = distinctCorporateIds.join(',');
//             this.crpSvc.getCorporates(crpId).subscribe((names) => {
//               console.log(names)
//               let corporationNames = names
//               this.merchantCollectionCount.forEach(item => {
//                 let matchingItem = corporationNames.find(element => element.id === item.collectionCenterId  );
//                 if (matchingItem != undefined)
//                   item.companyName = matchingItem.name;
      
//                 this.barChartData.labels = this.merchantCollectionCount.map((revenues) => revenues.companyName);
//                 console.log(matchingItem)
//               });
//             });
//             this.barChartData.datasets[0].data = this.merchantCollectionCount.map((revenues) => revenues.count);
//           })
       }
  }
}

