import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BIService } from 'src/app/biservice.service';
import { RevenueDateService } from 'src/app/revenue-date-service.service';


@Component({
  selector: 'collectioncenter-crop-bar-chart',
  templateUrl: './crop-bar-chart.component.html',
  styleUrls: ['./crop-bar-chart.component.css']
})
export class CropBarChartComponent {

  chartIntervals = ["Year", "Quarter", "Month", "Week"]
  selectedInterval: string = this.chartIntervals[0];
  selectedYear: number = 0;
  selectedWeek: number = 1;
  selectedQuarter: number;
  selectedMonth: string;
  years: number[] = [];
  months: string[];
  quarters: number[];
  weeks: any[] = []
  constructor(private svc: BIService, private datesvc: RevenueDateService) {
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
      x: {

      },
      y: {

        // min: 500,
        // max: 10000,
        ticks: {
          // stepSize: 500,
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
        // barThickness:50,
        data: [],
        label:'Crop Amount'
      },
    ],
  };

  ngOnInit(): void {
    this.svc.getYearsForCropRevenues().subscribe((response) => {
      this.years = response;
      if (this.years.length > 0) {
        this.selectedYear = this.years[0];
        this.fetchRevenuesData();
      }
    });
  }

  fetchRevenuesData() {
    this.barChartData.datasets[0].label =  this.selectedInterval +'ly Crop Amount'
    switch (this.selectedInterval) {
      case "Year":
        this.svc.getCollectionCenterYearWiseCropRevenue(this.selectedYear).subscribe((res) => {
          console.log(res)
          this.barChartData.labels = res.map(item => item.cropName);
          this.barChartData.datasets[0].data = res.map(item => item.amount);
          this.barChartData.datasets[0].backgroundColor = this.getBarColors(res.length);
        });
        this.weeks = this.datesvc.getWeeks(this.selectedYear);
        break;

      case "Quarter":
        this.svc.getCollectionCenterQuarterWiseCropRevenue(this.selectedYear, this.selectedQuarter).subscribe((res) => {
          console.log(res)
          this.barChartData.labels = res.map(item => item.cropName);
          this.barChartData.datasets[0].data = res.map(item => item.amount);
          this.barChartData.datasets[0].backgroundColor = this.getBarColors(res.length);
        });
        break;
      case "Month":
        this.svc.getCollectionCenterMonthWiseCropRevenue(this.selectedYear, this.selectedMonth).subscribe((res) => {
          console.log(res)
          this.barChartData.labels = res.map(item => item.cropName);
          this.barChartData.datasets[0].data = res.map(item => item.amount);
          this.barChartData.datasets[0].backgroundColor = this.getBarColors(res.length);
        });
        break;

      case "Week":

        let week = this.weeks.find(w => w.weekNumber == this.selectedWeek);
        let localStartDate = new Date(week.startDate.getTime() - week.startDate.getTimezoneOffset() * 60000);
        let startDate= localStartDate.toISOString().slice(0, 10);
        let localEndDate = new Date(week.endDate.getTime() - week.endDate.getTimezoneOffset() * 60000);
        let endDate=localEndDate.toISOString().slice(0, 10);
        this.svc.getCollectionCenterWeekWiseCropRevenue(startDate,endDate).subscribe((res) => {
          console.log(res)
          this.barChartData.labels = res.map(item => item.cropName);
          this.barChartData.datasets[0].data = res.map(item => item.amount);
          this.barChartData.datasets[0].backgroundColor = this.getBarColors(res.length);
        });
        break;
    }
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
