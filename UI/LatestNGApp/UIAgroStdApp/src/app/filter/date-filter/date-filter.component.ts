import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterRequest } from '../filter-request';
import { FiltersService } from '../filters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit, OnDestroy {

  @Input() filterRequest!: FilterRequest;
  @Input() filterFor!: string;
  @Output() filterChange = new EventEmitter<void>();
  isButtonClicked: boolean = false;
  expandedPropertyIndex: number = 0;
  dateProperties: string[] = []
  initializationDone: boolean = false;

  private datePropertiesSubscription: Subscription | undefined;

  constructor(private filterservice: FiltersService) { }
  ngOnInit(): void {

    //fetching property types
    this.datePropertiesSubscription = this.filterservice.getDateRangeProperties(this.filterFor).subscribe((response) => {
      this.dateProperties = response;
      if (!this.initializationDone) {
        if (!this.doesPreviousRequestContainsDateProperties(this.filterFor)) {
          this.initializeDateFilters();
        }
        this.initializationDone = true;
      }
    });
  }


  initializeDateFilters() {
    sessionStorage.setItem("dateFilterFor", this.filterFor);
    this.filterRequest.dateRangeFilters = this.dateProperties.map(property => {
      return { propertyName: property, fromDate: '', toDate: '' }
    });
  }


  updateToDate(index: number) {
    let fromDate = this.filterRequest.dateRangeFilters[index].fromDate;
    if (fromDate && this.filterRequest.dateRangeFilters[index].toDate == '') {
      let fromDateObj = new Date(fromDate);
      let toDateObj = new Date(fromDateObj.getTime() + (24 * 60 * 60 * 1000)); // Add one day (24 hours) to the fromDate
      this.filterRequest.dateRangeFilters[index].toDate = toDateObj.toISOString().substring(0, 10);
    }
  }

  onSubmit() {
    this.filterChange.emit();
    this.isButtonClicked = true;
    setTimeout(() => {
      this.isButtonClicked = false;
    }, 500);
  }


  toggleProperty(index: number): void {
    this.expandedPropertyIndex = index;
  }

  isPropertyExpanded(index: number): boolean {
    return this.expandedPropertyIndex === index;
  }

  doesPreviousRequestContainsDateProperties(filterFor: string): boolean {
    const prevFilterRequest = sessionStorage.getItem(filterFor + "prevFilterRequest");
    if (prevFilterRequest != null) {
      const filterRequest: FilterRequest = JSON.parse(prevFilterRequest);
      return filterRequest.dateRangeFilters.length > 0
    }
    return false;
  }

  ngOnDestroy(): void {
    this.datePropertiesSubscription?.unsubscribe();
  }
}
