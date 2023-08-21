import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterRequest } from '../filter-request';
import { FiltersService } from '../filters.service';
import { NameId } from 'src/app/name-id';
import { Corporate } from 'src/app/corporate';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() filterRequest!: FilterRequest;
  @Input() filterFor!: string;
  @Output() filterChange = new EventEmitter<void>();
  expandedPropertyIndex: number = 0;
  rangeProperties: string[] = [];
  isButtonClicked: boolean = false;
  initializationDone: boolean = false;

  roles: string[] = [];
  selectedRole: string = '';

  farmers: NameId[] = [];
  inspectors: NameId[] = [];
  merchants: Corporate[] = [];
  collectionCenters: Corporate[] = [];
  transporters: Corporate[] = [];

  searchText = '';
  showSuggestions = false;
  suggestions: any[] = [];



  private farmersSubscription: Subscription | undefined;
  private merchantsSubscription: Subscription | undefined;
  private collectionCentersSubscription: Subscription | undefined;
  private inspectorsSubscription: Subscription | undefined;
  private transportersSubscription: Subscription | undefined;

  constructor(private filterservice: FiltersService) {

  }

  ngOnInit(): void {
    this.filterservice.getRangeProperties(this.filterFor).subscribe((response) => {
      this.rangeProperties = response;
      if (!this.initializationDone) {
        if (!this.doesPreviousRequestContainsRangeProperties(this.filterFor)) {
          this.initializeRangeFilters();
        }
        this.initializationDone = true;
      }

      if (this.rangeProperties.includes("FarmerId")) {
        this.roles.push("FarmerId");
        this.farmersSubscription = this.filterservice.getFarmers().subscribe((farmers) => {
          this.farmers = farmers;
        })
      }

      if (this.rangeProperties.includes("InspectorId")) {
        this.roles.push("InspectorId");
        this.inspectorsSubscription = this.filterservice.getInspectors().subscribe((res) => {
          this.inspectors = res;
        })
      }


      if (this.rangeProperties.includes("MerchantCorporateId")) {
        this.roles.push("MerchantCorporateId");
        this.merchantsSubscription = this.filterservice.getMerchants().subscribe((res) => {
          this.merchants = res
        })
      }

      if (this.rangeProperties.includes("CollectionCenterCorporateId")) {
        this.roles.push("CollectionCenterCorporateId");
        this.collectionCentersSubscription = this.filterservice.getCollectionCenters().subscribe((res) => {
          this.collectionCenters = res;
        })
      }

      if (this.rangeProperties.includes("TransporterCorporateId")) {
        this.roles.push("TransporterCorporateId");
        this.transportersSubscription = this.filterservice.getTransporters().subscribe((res) => {
          this.transporters = res;
        })
      }
      this.selectedRole = this.roles[0];
      console.log(this.roles);
    });
  }


  displayPropertyName(property: string): string {
    return this.filterservice.displayPropertyName(property);
  }
  onSearchInput() {
    if (this.searchText) {
      this.showSuggestions = true;
      switch (this.selectedRole) {
        case "FarmerId":
          this.suggestions = this.farmers.filter(farmer =>
            farmer.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
          break;
        case "MerchantCorporateId":
          this.suggestions = this.merchants.filter(merchant =>
            merchant.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
          break;
        case "CollectionCenterCorporateId":
          this.suggestions = this.collectionCenters.filter(collectionCenter =>
            collectionCenter.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
          break;
        case "InspectorId":
          this.suggestions = this.inspectors.filter(inspector =>
            inspector.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
          break;
        case "TransporterCorporateId":
          this.suggestions = this.transporters.filter(transporter =>
            transporter.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
          break;
      }
    } else {
      this.showSuggestions = false;
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: Corporate) {
    this.searchText = suggestion.name;
    this.showSuggestions = false;
    this.suggestions = [];
    this.filterRequest.rangeFilters.forEach(property => {
      if (this.propertyIsPerson(this.selectedRole) && property.propertyName === this.selectedRole) {
        property.minValue = suggestion.id;
        property.maxValue = suggestion.id;
      }
      else if (this.propertyIsCorporate(this.selectedRole) && property.propertyName === this.selectedRole) {
        property.minValue = suggestion.corporateId;
        property.maxValue = suggestion.corporateId;
      }
    });
    this.filterChange.emit();
  }

  propertyIsPerson(property: string): boolean {
    return property === 'FarmerId' || property === 'InspectorId'
  }

  propertyIsCorporate(property: string): boolean {
    return property === 'MerchantCorporateId' || property === 'CollectionCenterCorporateId'
      || property === 'TransporterCorporateId'
  }

  initializeRangeFilters() {
    console.log("intializing");
    sessionStorage.setItem("rangeFilterFor", this.filterFor);
    this.filterRequest.rangeFilters = this.rangeProperties.map(property => {
      return { propertyName: property, minValue: undefined, maxValue: undefined };
    });
  }

  doesPreviousRequestContainsRangeProperties(filterFor: string): boolean {
    const prevFilterRequest = sessionStorage.getItem(filterFor+"prevFilterRequest");
    if (prevFilterRequest != null) {
      const filterRequest: FilterRequest = JSON.parse(prevFilterRequest);
      return filterRequest.rangeFilters.length > 0
    }
    return false;
  }

  ngOnDestroy(): void {
    this.farmersSubscription?.unsubscribe();
    this.merchantsSubscription?.unsubscribe();
    this.collectionCentersSubscription?.unsubscribe();
    this.inspectorsSubscription?.unsubscribe();
    this.transportersSubscription?.unsubscribe();
  }
}
