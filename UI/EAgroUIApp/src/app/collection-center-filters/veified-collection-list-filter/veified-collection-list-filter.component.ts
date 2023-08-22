import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { FiltersService } from 'src/app/Shared/filter/filters.service';
import { CollectionService } from 'src/app/collection-service.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { CollectionDetails } from 'src/app/collectioncenter/collection-details';
import { CollectionCenterFilterFor } from 'src/app/Shared/filter/collection-center-filter-for';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-veified-collection-list-filter',
  templateUrl: './veified-collection-list-filter.component.html',
  styleUrls: ['./veified-collection-list-filter.component.css']
})
export class VeifiedCollectionListFilterComponent implements OnInit, OnDestroy {
  collections: CollectionDetails[] = [];
  verifiedCollection = CollectionCenterFilterFor.verifiedCollection;
  private filterRequestSubscription: Subscription | undefined;
  private collectionsSubscription: Subscription | undefined;
  private farmerNamesSubscription: Subscription | undefined;
  private inspectorNamesSubscription: Subscription | undefined;
  constructor(private filtersvc: FiltersService, private collectionsvc: CollectionService, private usrsvc: UserService) { }
  ngOnInit(): void {
    this.filterRequestSubscription = this.filtersvc.getVerifiedCollectionFilterRequest().subscribe((res) => {
      const filterRequest = res.request;
      const pageNumber = res.pageNumber;
      this.getCollections(filterRequest, pageNumber);
    });
  }


  getCollections(filterRequest: any, pageNumber: number) {
    this.collectionsSubscription = this.collectionsvc.getVerifiedCollections(filterRequest, pageNumber)
      .subscribe((response: HttpResponse<any[]>) => {
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
