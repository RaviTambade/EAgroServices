import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CollectionCenterFilterFor } from 'src/app/Shared/filter/collection-center-filter-for';
import { FiltersService } from 'src/app/Shared/filter/filters.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { CollectionService } from 'src/app/collection-service.service';
import { Collection } from 'src/app/collectioncenter/collection';

@Component({
  selector: 'app-collection-list-filter',
  templateUrl: './collection-list-filter.component.html',
  styleUrls: ['./collection-list-filter.component.css']
})
export class CollectionListFilterComponent {

  collections: Collection[] = []
  collection = CollectionCenterFilterFor.collection;


  constructor(private filtersvc: FiltersService, private collectionsvc: CollectionService, private usrsvc: UserService) { }
  ngOnInit(): void {
    this.filtersvc.getCollectionFilterRequest().subscribe((res) => {
      const filterRequest = res.request;
      const pageNumber = res.pageNumber;
      this.getCollections(filterRequest, pageNumber);
    });
  }

  getCollections(filterRequest: any, pageNumber: number) {
    this.collectionsvc.getCollections(filterRequest, pageNumber)
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
