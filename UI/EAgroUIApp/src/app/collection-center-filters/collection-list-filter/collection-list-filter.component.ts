import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CollectionCenterFilterFor } from 'src/app/Shared/filter/collection-center-filter-for';
import { FiltersService } from 'src/app/Shared/filter/filters.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { CollectionService } from 'src/app/collection-service.service';
import { Collection } from 'src/app/collectioncenter/collection';
import { ShowButtonService } from 'src/app/show-button-service.service';

enum CollectionListType {
  Unverified = "Unverified",
  All = "All"
}
@Component({
  selector: 'app-collection-list-filter',
  templateUrl: './collection-list-filter.component.html',
  styleUrls: ['./collection-list-filter.component.css']
})
export class CollectionListFilterComponent {
  collectionListType = CollectionListType
  collections: Collection[] = []
  filterRequest: any;
  pageNumber: any;
  collection = CollectionCenterFilterFor.collection;
  collectionType: CollectionListType = CollectionListType.Unverified;


  constructor(private filtersvc: FiltersService, private collectionsvc: CollectionService, private usrsvc: UserService ,private btnsvc:ShowButtonService) { }
  ngOnInit(): void {
    this.filtersvc.getCollectionFilterRequest().subscribe((res) => {
      this.filterRequest = res.request;
      this.pageNumber = res.pageNumber;
      this.fetchCollections();
    });
  }

  onFetchCollectionClick(collectionType: CollectionListType) {
    this.collectionType = collectionType
    this.fetchCollections();
  }

  fetchCollections() {
    const type: string = this.collectionType === CollectionListType.Unverified ? CollectionListType.Unverified : CollectionListType.All
    if(type== CollectionListType.Unverified){
      this.btnsvc.setShowButtonVisibility(true);
    }
    if(type==CollectionListType.All){
      this.btnsvc.setShowButtonVisibility(false);
    }
    this.getCollections(this.filterRequest, this.pageNumber, type);
  }


  getCollections(filterRequest: any, pageNumber: number, type: string) {
    this.collectionsvc.getCollections(filterRequest, pageNumber, type)
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

        if (this.collections.length == 0) {
          return;
        }

        let distinctfarmerIds = this.collections.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let farmerIdString = distinctfarmerIds.join(',');

        this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
          let farmerNames = names
          this.collections.forEach(item => {
            let matchingItem = farmerNames.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.name;
          });
        });
      });
  }

}
