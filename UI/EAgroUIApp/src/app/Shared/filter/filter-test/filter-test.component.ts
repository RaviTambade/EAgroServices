import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FiltersService } from '../filters.service';
import { FilterRequest } from '../filter-request';
import { CollectionService } from 'src/app/collection-service.service';
import { UserService } from '../../users/user.service';
import { CollectionCenterFilterFor } from '../collection-center-filter-for';
import { Subscription } from 'rxjs';
import { NameId } from 'src/app/name-id';
import { Corporate } from 'src/app/corporate';


@Component({
  selector: 'filters',
  templateUrl: './filter-test.component.html',
  styleUrls: ['./filter-test.component.css']
})
export class FilterTestComponent implements OnInit, OnDestroy {

  @Input() collections: any[] = [];
  @Input() filterFor!: string

  collection = CollectionCenterFilterFor.collection;
  verifiedCollection = CollectionCenterFilterFor.verifiedCollection;
  shippedCollection = CollectionCenterFilterFor.shippedCollection;
  collectionPayments = CollectionCenterFilterFor.collectionPayments;

  filterRequest: FilterRequest = {
    equalFilters: [],
    rangeFilters: [],
    dateRangeFilters: [],
    sortBy: undefined,
    sortAscending: false
  };

  pageNumbers: any[] = [];
  pageNumber: number = 1;
  currentPage: number = 1;
  equalClickStatus: boolean = false;
  dateClickStatus: boolean = false;
  rangeClickStatus: boolean = false;

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

  private totalPagesSubscription: Subscription | undefined;
  constructor(private filterservice: FiltersService, private collectionsvc: CollectionService, private usrsvc: UserService) { }


  ngOnInit(): void {
    this.totalPagesSubscription = this.filterservice.getTotalPages().subscribe((totalPages) => {
      this.genratePageNumbers(totalPages);
    });

    this.farmersSubscription = this.filterservice.getFarmers().subscribe((farmers) => {
      this.farmers = farmers;
    });

    this.merchantsSubscription = this.filterservice.getMerchants().subscribe((res) => {
      this.merchants = res;
    });

    this.collectionCentersSubscription = this.filterservice.getCollectionCenters().subscribe((res) => {
      this.collectionCenters = res;
    });

    this.inspectorsSubscription = this.filterservice.getInspectors().subscribe((res) => {
      this.inspectors = res;
    });

    this.transportersSubscription = this.filterservice.getTransporters().subscribe((res) => {
      this.transporters = res;
    });
    let prevFilterRequest = sessionStorage.getItem("prevFilterRequest");
    if (prevFilterRequest != null) {
      this.filterRequest = JSON.parse(prevFilterRequest);
    }
    console.log(this.filterFor)
    this.getCollections(this.filterFor);
  }


  displayNameMap = [
    { key: 'FarmerId', value: 'Farmer' },
    { key: 'MerchantCorporateId', value: 'Merchant' },
    { key: 'CollectionCenterCorporateId', value: 'CollectionCenter' },
    { key: 'TransporterCorporateId', value: 'Transporter' },
    { key: 'InspectorId', value: 'Inspector' },
  ];

  getDisplayValue(minVal: number | undefined, maxVal: number | undefined, property: string): any {
    if (property === 'FarmerId') {
      let farmer = this.farmers.find(farmer => farmer.id === minVal);
      return farmer?.name
    }
    if (property === 'MerchantCorporateId') {
      let merchant = this.merchants.find(merchant => merchant.corporateId === minVal);
      return merchant?.name;
    }

    if (property === 'InspectorId') {
      let inspector = this.inspectors.find(inspector => inspector.id === minVal);
      return inspector?.name;
    }
    if (property === 'CollectionCenterCorporateId') {
      let collectionCenter = this.collectionCenters.find(collectionCenter => collectionCenter.corporateId === minVal);
      return collectionCenter?.name;
    }
    if (property === 'TransporterCorporateId') {
      let transporter = this.transporters.find(transporter => transporter.corporateId === minVal);
      return transporter?.name;
    }
    return minVal?.toString() + " -" + maxVal?.toString();
  }


  displayPropertyName(property: string): string {
    const mapping = this.displayNameMap.find(map => map.key === property);
    return mapping?.value || property;
  }
  onClickEqualFilters() {
    this.equalClickStatus = true;
    this.dateClickStatus = false;
    this.rangeClickStatus = false;
  }
  onClickDateFilters() {
    this.equalClickStatus = false;
    this.dateClickStatus = true;
    this.rangeClickStatus = false;
  }

  onClickRangeFilters() {
    this.equalClickStatus = false;
    this.dateClickStatus = false;
    this.rangeClickStatus = true;
  }
  onClickCloseFilters() {
    this.equalClickStatus = false;
    this.dateClickStatus = false;
    this.rangeClickStatus = false;
  }



  clearFilters() {
    this.filterRequest = {
      equalFilters: [],
      rangeFilters: [],
      dateRangeFilters: [],
      sortBy: undefined,
      sortAscending: false
    };
    window.location.reload();
    this.getCollections(this.filterFor);

  }

  removeDefaultValues(filterRequest: FilterRequest): FilterRequest {
    const filteredRequest: FilterRequest = {
      equalFilters: [],
      rangeFilters: [],
      dateRangeFilters: [],
      sortBy: undefined,
      sortAscending: false
    }
    // Filter and assign values to equalFilters
    filteredRequest.equalFilters = filterRequest.equalFilters.filter(
      (filter) => filter.propertyValues.length > 0
    );
    // Filter and assign values to dateRangeFilters
    filteredRequest.dateRangeFilters = filterRequest.dateRangeFilters.filter(
      (filter) => filter.fromDate !== '' || filter.toDate !== ''
    );
    // Filter and assign values to rangeFilters
    filteredRequest.rangeFilters = filterRequest.rangeFilters.filter(
      (filter) => filter.minValue !== undefined || filter.maxValue !== undefined
    );
    filteredRequest.sortBy = filterRequest.sortBy;
    filteredRequest.sortAscending = filterRequest.sortAscending;
    return filteredRequest;
  }


  getCollections(filterFor: string) {
    if (this.isFilterRequestChanged(this.filterRequest)) {
      this.pageNumber = 1;
      this.currentPage = 1;
    }
    sessionStorage.setItem("prevFilterRequest", JSON.stringify(this.filterRequest));

    var filterRequest = this.removeDefaultValues(this.filterRequest);
    console.log("🚀 ~ getCollections ~ filterrequest:", filterRequest);
    console.log(this.pageNumber);

    switch (filterFor) {
      case CollectionCenterFilterFor.verifiedCollection:
        this.filterservice.sendVerifiedCollectionFilterRequest(filterRequest, this.pageNumber);
        break;
      case CollectionCenterFilterFor.collection:
        this.filterservice.sendCollectionFilterRequest(filterRequest, this.pageNumber);
        break;

      case CollectionCenterFilterFor.shippedCollection:
        this.filterservice.sendShippedCollectionFilterRequest(filterRequest, this.pageNumber);
        break;

      case CollectionCenterFilterFor.collectionPayments:
        this.filterservice.sendCollectionPaymentListFilterRequest(filterRequest, this.pageNumber);
        break;
    }


  }


  onPageClick(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.currentPage = pageNumber;
    this.getCollections(this.filterFor);
    console.log('Clicked page number:', pageNumber);
  }

  isFilterRequestChanged(filterRequest: FilterRequest): boolean {
    var prevFilterRequest = sessionStorage.getItem("prevFilterRequest");
    if (prevFilterRequest == null) {
      return false;
    }
    return prevFilterRequest !== JSON.stringify(filterRequest);
  }

  removeFilterProperty(filterType: string, index: number) {
    if (filterType === 'dateRange') {
      // Set fromDate and toDate to empty strings
      this.filterRequest.dateRangeFilters[index].fromDate = '';
      this.filterRequest.dateRangeFilters[index].toDate = '';
      this.getCollections(this.filterFor);
    } else if (filterType === 'range') {

      this.filterRequest.rangeFilters[index].minValue = undefined;
      this.filterRequest.rangeFilters[index].maxValue = undefined;
      this.getCollections(this.filterFor);
    }
  }

  removeEqualFilterProperty(equalIndex: number, valueIndex: number) {
    this.filterRequest.equalFilters[equalIndex].propertyValues.splice(valueIndex, 1);
    this.getCollections(this.filterFor);
  }

  genratePageNumbers(totalPages: number) {
    console.log("processed data")
    console.log(totalPages)
    this.pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  ngOnDestroy(): void {
    this.totalPagesSubscription?.unsubscribe();
    this.farmersSubscription?.unsubscribe();
    this.merchantsSubscription?.unsubscribe();
    this.collectionCentersSubscription?.unsubscribe();
    this.inspectorsSubscription?.unsubscribe();
    this.transportersSubscription?.unsubscribe();
  }
}



