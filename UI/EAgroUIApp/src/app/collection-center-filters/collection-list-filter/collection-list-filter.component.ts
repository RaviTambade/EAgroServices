import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Collection } from 'src/app/Models/collection';
import { CollectionService } from 'src/app/Services/collection-service.service';
import { ShowButtonService } from 'src/app/Services/show-button-service.service';
import { CollectionCenterFilterFor } from 'src/app/Shared/filter/collection-center-filter-for';
import { FilterRequest } from 'src/app/Shared/filter/filter-request';
import { FiltersService } from 'src/app/Shared/filter/filters.service';
import { UserService } from 'src/app/Shared/users/user.service';


enum CollectionListType {
  Unverified = "Unverified",
  All = "All"
}

@Component({
  selector: 'app-collection-list-filter',
  templateUrl: './collection-list-filter.component.html',
  styleUrls: ['./collection-list-filter.component.css']
})
export class CollectionListFilterComponent implements OnInit, OnDestroy {
  collectionListType = CollectionListType;
  collections: Collection[] = [];
  filterRequest: FilterRequest | undefined;
  pageNumber: number = 1;
  collection = CollectionCenterFilterFor.collection;
  collectionType: CollectionListType = CollectionListType.Unverified;

  private filterRequestSubscription: Subscription | undefined;
  private collectionsSubscription: Subscription | undefined;
  private userNamesSubscription: Subscription | undefined;

  constructor(
    private filtersvc: FiltersService,
    private collectionsvc: CollectionService,
    private usrsvc: UserService,
    private btnsvc: ShowButtonService
  ) { }

  ngOnInit(): void {
    this.filterRequestSubscription = this.filtersvc.getCollectionFilterRequest().subscribe((res) => {
      this.filterRequest = res.request;
      this.pageNumber = res.pageNumber;
      this.fetchCollections();
    });
  }

  onFetchCollectionClick(collectionType: CollectionListType) {
    this.collectionType = collectionType;
    this.fetchCollections();
  }

  fetchCollections() {
    const type: string = this.collectionType === CollectionListType.Unverified ? CollectionListType.Unverified : CollectionListType.All;
    if (type == CollectionListType.Unverified) {
      this.btnsvc.setShowButtonVisibility(true);
    }
    if (type == CollectionListType.All) {
      this.btnsvc.setShowButtonVisibility(false);
    }
    if (!this.filterRequest) {
      return
    }
    this.getCollections(this.filterRequest, this.pageNumber, type);

  }

  getCollections(filterRequest: FilterRequest, pageNumber: number, type: string) {
    this.collectionsSubscription = this.collectionsvc.getCollections(filterRequest, pageNumber, type)
      .subscribe((response: HttpResponse<Collection[]>) => {
        console.log('Filter request sent successfully:', response.body);
        this.collections = response.body || [];
        console.table(this.collections);
        const paginationHeader = response.headers.get('X-Pagination');
        if (paginationHeader) {
          const paginationData = JSON.parse(paginationHeader);
          console.log('Total Pages:', paginationData.TotalPages);
          let totalPages = paginationData.TotalPages;
          this.filtersvc.sendTotalPages(totalPages);
        }

        if (this.collections.length == 0) {
          return;
        }

        let distinctfarmerIds = this.collections.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let farmerIdString = distinctfarmerIds.join(',');

        this.userNamesSubscription = this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
          let farmerNames = names;
          this.collections.forEach(item => {
            let matchingItem = farmerNames.find(element => element.id === item.farmerId);
            if (matchingItem != undefined) {
              item.farmerName = matchingItem.name;
            }
          });
        });
      });
  }

  ngOnDestroy(): void {
    this.filterRequestSubscription?.unsubscribe();
    this.collectionsSubscription?.unsubscribe();
    this.userNamesSubscription?.unsubscribe();
  }
}
