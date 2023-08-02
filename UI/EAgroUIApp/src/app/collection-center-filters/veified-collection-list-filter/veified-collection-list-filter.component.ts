import { Component, OnInit } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { FiltersService } from 'src/app/Shared/filter/filters.service';
import { CollectionService } from 'src/app/collection-service.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { CollectionDetails } from 'src/app/collectioncenter/collection-details';
import { CollectionCenterFilterFor } from 'src/app/Shared/filter/collection-center-filter-for';


@Component({
  selector: 'app-veified-collection-list-filter',
  templateUrl: './veified-collection-list-filter.component.html',
  styleUrls: ['./veified-collection-list-filter.component.css']
})
export class VeifiedCollectionListFilterComponent implements OnInit {
  collections: CollectionDetails[] = [];
  verifiedCollection = CollectionCenterFilterFor.verifiedCollection;
  
  constructor(private filtersvc: FiltersService, private collectionsvc: CollectionService, private usrsvc: UserService) { }
  ngOnInit(): void {
    this.filtersvc.getVerifiedCollectionFilterRequest().subscribe((res)=>{
      const filterRequest = res.request;
      const pageNumber = res.pageNumber;
      this.getCollections(filterRequest,pageNumber);
    });
    }


  getCollections(filterRequest: any, pageNumber: number) {
    // console.log(JSON.stringify(filterRequest))
    this.collectionsvc.getCollections(filterRequest, pageNumber)
      .subscribe((response: HttpResponse<any[]>) => {
        console.log('Filter request sent successfully:', response.body);
        this.collections = response.body || [];
        console.table(this.collections)
        // console.log(response.headers)
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

        let distinctinspectorIds = this.collections.map(item => item.inspectorId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let inspectorIdString = distinctinspectorIds.join(',');


        this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
          let farmerNames = names
          this.collections.forEach(item => {
            let matchingItem = farmerNames.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.name;
          });
        });

        this.usrsvc.getUserNamesWithId(inspectorIdString).subscribe((names) => {
          let inspectorNames = names
          this.collections.forEach(item => {
            let matchingItem = inspectorNames.find(element => element.id === item.inspectorId);
            if (matchingItem != undefined)
              item.inspectorName = matchingItem.name;
          });
        });
      });
  }
}
