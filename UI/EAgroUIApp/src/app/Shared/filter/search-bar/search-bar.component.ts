import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterRequest } from '../filter-request';
import { FiltersService } from '../filters.service';
import { NameId } from 'src/app/name-id';
import { Corporate } from 'src/app/corporate';
import { Subscription } from 'rxjs';
import { Farmer } from 'src/app/farmer/farmer';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
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

  searchQuery = '';
  showSuggestions = false;
  suggestions: any[] = [];

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

  displayNameMap = [
    { key: 'FarmerId', value: 'Farmer' },
    { key: 'MerchantCorporateId', value: 'Merchant' },
    { key: 'CollectionCenterCorporateId', value: 'CollectionCenter' },
    { key: 'TransporterCorporateId', value: 'Transporter' },
    { key: 'InspectorId', value: 'Inspector' },
  ];

  displayPropertyName(property: string): string {
    const mapping = this.displayNameMap.find(map => map.key === property);
    return mapping?.value || property;
  }
  onSearchInput() {
    if (this.searchQuery) {
      this.showSuggestions = true;
      console.log(this.selectedRole)
      switch (this.selectedRole) {
        case "FarmerId":
          this.suggestions = this.farmers.filter(farmer =>
            farmer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          break;
        case "MerchantCorporateId":
          this.suggestions = this.merchants.filter(merchant =>
            merchant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          break;
        case "CollectionCenterCorporateId":
          this.suggestions = this.collectionCenters.filter(collectionCenter =>
            collectionCenter.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          break;
        case "InspectorId":
          this.suggestions = this.inspectors.filter(inspector =>
            inspector.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          break;
        case "TransporterCorporateId":
          this.suggestions = this.transporters.filter(transporter =>
            transporter.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          break;
      }
    } else {
      this.showSuggestions = false;
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: Corporate) {
    this.searchQuery = suggestion.name;
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

  doesPreviousRequestContainsRangeProperties(): boolean {
    const prevFilterRequest = sessionStorage.getItem("prevFilterRequest");
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
