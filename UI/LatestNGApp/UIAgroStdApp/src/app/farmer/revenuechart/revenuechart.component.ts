import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revenuechart',
  templateUrl: './revenuechart.component.html',
  styleUrls: ['./revenuechart.component.css']
})
export class RevenuechartComponent{
  selectedMonth: string = ''; // Initialize the selected month
  startDate: string = ''; // Initialize the start date
  endDate: string = ''; // Initialize the end date

  constructor(private http: HttpClient) { }

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
console.log(this.startDate,this.endDate);
    // Now, you can send the start date and end date to your API
   // this.sendDatesToAPI();
  }

 // sendDatesToAPI() {
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
   // const apiEndpoint = 'YOUR_API_ENDPOINT';
    
    // Create an object with the start date and end date
    // const dateData = {
    //   startDate: this.startDate,
    //   endDate: this.endDate
    // };

    // Send a POST request to your API with the date data
    // this.http.post(apiEndpoint, dateData).subscribe(
    //   response => {
    //     console.log('API response:', response);
    //     // Handle the API response as needed
    //   },
    //   error => {
    //     console.error('API error:', error);
    //     // Handle errors if necessary
    //   }
    // );
  }

  


