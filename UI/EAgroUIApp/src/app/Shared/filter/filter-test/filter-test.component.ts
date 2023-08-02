import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FiltersService } from '../filters.service';
import { FilterRequest } from '../filter-request';
import { CollectionService } from 'src/app/collection-service.service';
import { UserService } from '../../users/user.service';
import { CollectionCenterFilterFor } from '../collection-center-filter-for';


@Component({
  selector: 'filters',
  templateUrl: './filter-test.component.html',
  styleUrls: ['./filter-test.component.css']
})
export class FilterTestComponent implements OnInit {

 @Input() collections: any[] = [];
 @Input() filterFor:string ='' 

  collection = CollectionCenterFilterFor.collection;
  verifiedCollection = CollectionCenterFilterFor.verifiedCollection;
  shippedCollection = CollectionCenterFilterFor.shippedCollection;

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


  constructor(private filterservice: FiltersService, private collectionsvc: CollectionService, private usrsvc: UserService) { }


  ngOnInit(): void {
    CollectionCenterFilterFor.collection
    this.filterservice.getTotalPages().subscribe((toatalPages) => {
      CollectionCenterFilterFor.collection
      this.genratePageNumbers(toatalPages);
      console.log("processed data")
    });

    let prevFilterRequest = sessionStorage.getItem("prevFilterRequest");
    if (prevFilterRequest != null) {
      this.filterRequest = JSON.parse(prevFilterRequest);
    }
    this.getCollections();
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
    this.getCollections();
    window.location.reload();
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



  getCollections() {
    if (this.isFilterRequestChanged(this.filterRequest)) {
      this.pageNumber = 1;
      this.currentPage = 1;
    }
    sessionStorage.setItem("prevFilterRequest", JSON.stringify(this.filterRequest));

    var filterRequest = this.removeDefaultValues(this.filterRequest);
    console.log("🚀 ~ getCollections ~ filterrequest:", filterRequest);
    console.log(this.pageNumber);

    this.filterservice.sendVerifiedCollectionFilterRequest(filterRequest,this.pageNumber )

    // // console.log(JSON.stringify(filterRequest))
    // this.collectionsvc.getCollections(filterRequest, this.pageNumber)
    //   .subscribe((response: HttpResponse<any[]>) => {
    //     console.log('Filter request sent successfully:', response.body);
    //     this.collections = response.body || [];
    //     console.table(this.collections)
    //     // console.log(response.headers)
    //     const paginationHeader = response.headers.get('X-Pagination');
    //     if (paginationHeader) {
    //       const paginationData = JSON.parse(paginationHeader);
    //       // console.log(paginationData)
    //       console.log('Total Pages:', paginationData.TotalPages);
    //       this.totalPages = paginationData.TotalPages;
    //       this.pageNumbers = Array.from({ length: this.totalPages }, (_, index) => index + 1);
    //     }

    //     if (this.collections.length == 0) {
    //             return;
    //           }

    //           let distinctfarmerIds = this.collections.map(item => item.farmerId)
    //             .filter((number, index, array) => array.indexOf(number) === index);

    //           let farmerIdString = distinctfarmerIds.join(',');

    //           let distinctinspectorIds = this.collections.map(item => item.inspectorId)
    //             .filter((number, index, array) => array.indexOf(number) === index);

    //           let inspectorIdString = distinctinspectorIds.join(',');


    //           this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
    //             let farmerNames = names
    //             this.collections.forEach(item => {
    //               let matchingItem = farmerNames.find(element => element.id === item.farmerId);
    //               if (matchingItem != undefined)
    //                 item.farmerName = matchingItem.name;
    //             });
    //           });

    //           this.usrsvc.getUserNamesWithId(inspectorIdString).subscribe((names) => {
    //             let inspectorNames = names
    //             this.collections.forEach(item => {
    //               let matchingItem = inspectorNames.find(element => element.id === item.inspectorId);
    //               if (matchingItem != undefined)
    //                 item.inspectorName = matchingItem.name;
    //             });
    //           });  
    //   });
  }


  onPageClick(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.currentPage = pageNumber;
    this.getCollections();
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
      this.getCollections();
    } else if (filterType === 'range') {

      this.filterRequest.rangeFilters[index].minValue = undefined;
      this.filterRequest.rangeFilters[index].maxValue = undefined;
      this.getCollections();
    }
  }

  removeEqualFilterProperty(equalIndex: number, valueIndex: number) {
    this.filterRequest.equalFilters[equalIndex].propertyValues.splice(valueIndex, 1);
    this.getCollections();
  }

  genratePageNumbers(totalPages: number) {
    this.pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

}


