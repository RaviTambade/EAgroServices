import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevenueDateService {

  constructor() { }

  private months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']

  private quarters: number[] = [1, 2, 3, 4]
  private weeks: { weekNumber: number, startDate: Date, endDate: Date }[] = [];

  getMonths(): string[] {
    return this.months;
  }
  getQuarters(): number[] {
    return this.quarters;
  }

  getWeeks(year:number){
    this.generateWeekDates(year);
    return this.weeks;
  }

 private generateWeekDates(year: number) {
    const startDate = new Date(year, 0, 1);

    let weekNumber = 1;

    while (startDate.getFullYear() === year) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      this.weeks.push({
        weekNumber: weekNumber,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      startDate.setDate(startDate.getDate() + 7);
      weekNumber++;
    }
  }
  
}
