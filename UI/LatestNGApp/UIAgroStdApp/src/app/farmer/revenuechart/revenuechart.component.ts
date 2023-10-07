import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revenuechart',
  templateUrl: './revenuechart.component.html',
  styleUrls: ['./revenuechart.component.css']
})
export class RevenuechartComponent implements OnInit {
  selectedMonth: string = ''; // Initialize the selected month
  startDate: string = ''; // Initialize the start date
  endDate: string = ''; // Initialize the end date
  currentMonthIndex: number | any;
  selectedQuarter: string = '';
  currentQuarterIndex: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    this.currentMonthIndex = currentDate.getMonth();

    // Set the selectedMonth to the name of the current month
    this.selectedMonth = this.months[this.currentMonthIndex];

    // Calculate the last day of the current month
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // If the selected month is the current month, set the end date to the current date
    if (this.selectedMonth === this.months[this.currentMonthIndex]) {
      this.endDate = `${currentDate.getFullYear()}-${(this.currentMonthIndex + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    } else {
      // Calculate the end date for other months
      this.endDate = `${currentDate.getFullYear()}-${(this.currentMonthIndex + 1).toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
    }

    // Calculate the start date (first day of the selected month)
    this.startDate = `${currentDate.getFullYear()}-${(this.currentMonthIndex + 1).toString().padStart(2, '0')}-01`;

    // Determine the current quarter index based on the current month
    this.currentQuarterIndex = Math.floor(currentMonth / 3);

    // Set the selectedQuarter to the current quarter
    this.selectedQuarter = `Q${this.currentQuarterIndex + 1}`;

    // Calculate the start date for the selected quarter (first day of the first month)
    const startMonth = this.currentQuarterIndex * 3;
    this.startDate = `${currentDate.getFullYear()}-${(startMonth + 1).toString().padStart(2, '0')}-01`;

    // Set the end date for the current quarter to the current date
    if (this.currentQuarterIndex === Math.floor(currentDate.getMonth() / 3)) {
      this.endDate = `${currentDate.getFullYear()}-${(currentMonth + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    }

    console.log(this.startDate, this.endDate);
  }

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  calculateDates() {
    // Convert the selected month to a month number (1 to 12)
    const monthNumber = this.months.indexOf(this.selectedMonth) + 1;

    // Get the current year
    const year = new Date().getFullYear();

    // Calculate the start date (first day of the selected month)
    this.startDate = `${year}-${monthNumber.toString().padStart(2, '0')}-01`;

    // Calculate the end date (last day of the selected month)
    const lastDay = new Date(year, monthNumber, 0).getDate();
    this.endDate = `${year}-${monthNumber.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
    console.log(this.startDate, this.endDate);
    // Now, you can send the start date and end date to your API
    // this.sendDatesToAPI();
  }
  quarters: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];

  calculateQuarterDates(quarterIndex: number) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Calculate the start month and end month for the selected quarter
    const startMonth = quarterIndex * 3;
    const endMonth = startMonth + 2;

    // Calculate the start date (first day of the start month)
    this.startDate = `${currentYear}-${(startMonth + 1).toString().padStart(2, '0')}-01`;

    // If the selected quarter is the current quarter, set the end date to the current date
    if (quarterIndex === this.currentQuarterIndex) {
      this.endDate = `${currentDate.getFullYear()}-${(endMonth + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      this.selectedMonth = this.months[startMonth];
      console.log(this.startDate,this,this.endDate);
       // Update selected month
    } else {
      // Calculate the end date for other quarters
      const lastDay = new Date(currentYear, endMonth + 1, 0).getDate();
      this.endDate = `${currentYear}-${(endMonth + 1).toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
      this.selectedMonth = this.months[startMonth]; // Update selected month
      console.log(this.startDate,this,this.endDate);
    }
  }

  onQuarterChange() {
    // Calculate start date, end date, and update selected month based on the selected quarter
    const quarterIndex = this.quarters.indexOf(this.selectedQuarter);
    this.calculateQuarterDates(quarterIndex);
  }
}
