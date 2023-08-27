import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { FiltersService } from 'src/app/Shared/filter/filters.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { CollectionCenterFilterFor } from 'src/app/Shared/filter/collection-center-filter-for';
import { Subscription } from 'rxjs';
import { CollectionDetail } from 'src/app/Models/collection-details';
import { CollectionService } from 'src/app/Services/collection-service.service';
import { FilterRequest } from 'src/app/Shared/filter/filter-request';


@Component({
  selector: 'app-veified-collection-list-filter',
  templateUrl: './veified-collection-list-filter.component.html',
  styleUrls: ['./veified-collection-list-filter.component.css']
})
export class VeifiedCollectionListFilterComponent implements OnInit, OnDestroy {
  collections: CollectionDetail[] = [];
  verifiedCollection = CollectionCenterFilterFor.verifiedCollection;
  private filterRequestSubscription: Subscription | undefined;
  private collectionsSubscription: Subscription | undefined;
  private farmerNamesSubscription: Subscription | undefined;
  private inspectorNamesSubscription: Subscription | undefined;

  constructor(
    private filtersvc: FiltersService,
    private collectionsvc: CollectionService,
    private usrsvc: UserService) { }

  ngOnInit(): void {
    this.filterRequestSubscription = this.filtersvc.getVerifiedCollectionFilterRequest().subscribe((res) => {
      const filterRequest = res.request;
      const pageNumber = res.pageNumber;
      this.getCollections(filterRequest, pageNumber);
    });
  }


  getCollections(filterRequest: FilterRequest, pageNumber: number) {
    this.collectionsSubscription = this.collectionsvc.getVerifiedCollections(filterRequest, pageNumber)
      .subscribe((response: HttpResponse<CollectionDetail[]>) => {
        console.log('Filter request sent successfully:', response.body);
        this.collections = response.body || [];
        console.table(this.collections)
        const paginationHeader = response.headers.get('X-Pagination');
        if (paginationHeader) {
          const paginationData = JSON.parse(paginationHeader);
          // console.log(paginationData)
          console.log('Total Pages:', paginationData.TotalPages);
          let totalPages = paginationData.TotalPages;
          this.filtersvc.sendTotalPages(totalPages);
        }

        if (this.collections.length > 0) {
          let distinctfarmerIds = this.collections.map(item => item.farmerId)
            .filter((number, index, array) => array.indexOf(number) === index);

          let farmerIdString = distinctfarmerIds.join(',');

          let distinctinspectorIds = this.collections.map(item => item.inspectorId)
            .filter((number, index, array) => array.indexOf(number) === index);

          let inspectorIdString = distinctinspectorIds.join(',');


          this.farmerNamesSubscription = this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
            let farmerNames = names
            this.collections.forEach(item => {
              let matchingItem = farmerNames.find(element => element.id === item.farmerId);
              if (matchingItem != undefined)
                item.farmerName = matchingItem.name;
            });
          });

          this.inspectorNamesSubscription = this.usrsvc.getUserNamesWithId(inspectorIdString).subscribe((names) => {
            let inspectorNames = names
            this.collections.forEach(item => {
              let matchingItem = inspectorNames.find(element => element.id === item.inspectorId);
              if (matchingItem != undefined)
                item.inspectorName = matchingItem.name;
            });
          });
        }
      });
  }
  ngOnDestroy(): void {
    this.filterRequestSubscription?.unsubscribe();
    this.collectionsSubscription?.unsubscribe();
    this.farmerNamesSubscription?.unsubscribe();
    this.inspectorNamesSubscription?.unsubscribe();
  }
}
