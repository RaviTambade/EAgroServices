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
export class RangeFilterComponent implements OnInit ,OnDestroy {

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

  private farmersSubscription: Subscription | undefined;
  private merchantsSubscription: Subscription | undefined;
  private collectionCentersSubscription: Subscription | undefined;
  private inspectorsSubscription: Subscription | undefined;
  private transportersSubscription: Subscription | undefined;

  constructor(private filterservice: FiltersService) { }

  ngOnInit(): void {

    this.filterservice.getRangeProperties(this.filterFor).subscribe((response) => {
      this.rangeProperties = response;
      let filterFor = sessionStorage.getItem("rangeFilterFor");
      if (this.filterFor !== filterFor) {
        this.initializeRangeFilters();
      }
      else if (!this.initializationDone) {
        if (!this.doesPreviousRequestContainsRangeProperties()) {
          this.initializeRangeFilters();
        }
        this.initializationDone = true;
      }

      if (this.rangeProperties.includes("FarmerId")) {
        this.rangeProperties = this.rangeProperties.map(property => property.replace("FarmerId", "Farmer"));
        this.farmersSubscription = this.filterservice.getFarmers().subscribe((farmers) => {
          this.farmers = farmers;
        })
      }

      if (this.rangeProperties.includes("InspectorId")) {
        this.rangeProperties = this.rangeProperties.map(property => property.replace("InspectorId", "Inspector"));
        this.inspectorsSubscription = this.filterservice.getInspectors().subscribe((res) => {
          this.inspectors = res;
        })
      }


      if (this.rangeProperties.includes("MerchantCorporateId")) {
        this.rangeProperties = this.rangeProperties.map(property => property.replace("MerchantCorporateId", "Merchant"));
        this.merchantsSubscription = this.filterservice.getMerchants().subscribe((res) => {
          this.merchants = res
        })
      }

      if (this.rangeProperties.includes("CollectionCenterCorporateId")) {
        this.rangeProperties = this.rangeProperties.map(property => property.replace("CollectionCenterCorporateId", "CollectionCenter"));
        this.collectionCentersSubscription = this.filterservice.getCollectionCenters().subscribe((res) => {
          this.collectionCenters = res;
        })
      }

      if (this.rangeProperties.includes("TransporterCorporateId")) {
        this.rangeProperties = this.rangeProperties.map(property => property.replace("TransporterCorporateId", "Transporter"));
        this.transportersSubscription = this.filterservice.getTransporters().subscribe((res) => {
          this.transporters = res;
        })
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

  doesPreviousRequestContainsRangeProperties(): boolean {
    const prevFilterRequest = sessionStorage.getItem("prevFilterRequest");
    if (prevFilterRequest != null) {
      const filterRequest: FilterRequest = JSON.parse(prevFilterRequest);
      return filterRequest.rangeFilters.length > 0
    }
    return false;
  }

  propertyIsNotPersonOrCorporateId(property: string): boolean {
    return property !== 'Farmer' && property !== 'Inspector' && property !== 'Merchant'
      && property !== 'CollectionCenter' && property !== 'Transporter';
  }


  ngOnDestroy(): void {
    this.farmersSubscription?.unsubscribe();
    this.merchantsSubscription?.unsubscribe();
    this.collectionCentersSubscription?.unsubscribe();
    this.inspectorsSubscription?.unsubscribe();
    this.transportersSubscription?.unsubscribe();
  }

}
