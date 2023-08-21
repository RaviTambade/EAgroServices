import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterRequest } from '../filter-request';
import { FiltersService } from '../filters.service';
import { NameId } from 'src/app/name-id';
import { Corporate } from 'src/app/corporate';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.css']
})
export class RangeFilterComponent implements OnInit, OnDestroy {

  @Input() filterRequest!: FilterRequest;
  @Input() filterFor!: string;
  @Output() filterChange = new EventEmitter<void>();
  expandedPropertyIndex: number = 0;
  rangeProperties: string[] = [];
  isButtonClicked: boolean = false;
  initializationDone: boolean = false;

  farmers: NameId[] = [];
  inspectors: NameId[] = [];
  merchants: Corporate[] = [];
  collectionCenters: Corporate[] = [];
  transporters: Corporate[] = [];

  private rangePropertiesSubscription: Subscription | undefined;


  constructor(private filterservice: FiltersService) { }

  ngOnInit(): void {

    this.rangePropertiesSubscription = this.filterservice.getRangeProperties(this.filterFor).subscribe((response) => {
      this.rangeProperties = response;
       if (!this.initializationDone) {
        if (!this.doesPreviousRequestContainsRangeProperties(this.filterFor)) {
          this.initializeRangeFilters();
        }
        this.initializationDone = true;
      }
    });
  }

  initializeRangeFilters() {
    sessionStorage.setItem("rangeFilterFor", this.filterFor);
    this.filterRequest.rangeFilters = this.rangeProperties.map(property => {
      return { propertyName: property, minValue: undefined, maxValue: undefined };
    });
  }

  setMaxValue(index: number) {
    const minVal = this.filterRequest.rangeFilters[index].minValue;
    this.filterRequest.rangeFilters[index].maxValue = minVal;

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

  doesPreviousRequestContainsRangeProperties(filterFor:string): boolean {
    const prevFilterRequest = sessionStorage.getItem(filterFor+"prevFilterRequest");
    if (prevFilterRequest != null) {
      const filterRequest: FilterRequest = JSON.parse(prevFilterRequest);
      return filterRequest.rangeFilters.length > 0
    }
    return false;
  }

  propertyIsNotPersonOrCorporateId(property: string): boolean {
    return property !== 'FarmerId' && property !== 'InspectorId' && property !== 'MerchantCorporateId'
      && property !== 'CollectionCenterCorporateId' && property !== 'TransporterCorporateId';
  }
  ngOnDestroy(): void {
    this.rangePropertiesSubscription?.unsubscribe();
  }
}
