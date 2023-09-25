import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionListType } from 'src/app/Models/Enum/CollectionListType';
import { Collections } from 'src/app/Models/collections';
import { CollectionService } from 'src/app/Services/collection.service';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { ShowButtonService } from 'src/app/Services/show-button-service.service';
import { UserService } from 'src/app/Services/user.service';
import { CollectionCenterFilterFor } from 'src/app/filter/collection-center-filter-for';
import { FilterRequest } from 'src/app/filter/filter-request';
import { FiltersService } from 'src/app/filter/filters.service';



@Component({
  selector: 'app-unverifiedcollection',
  templateUrl: './unverifiedcollection.component.html',
  styleUrls: ['./unverifiedcollection.component.css']
})
export class UnverifiedcollectionComponent {

  collectionListType = CollectionListType;
  collections: Collections[] = [];
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
    private Collectionmanager:CollectionmanagerService,
    private usrsvc: UserService,
    private btnsvc: ShowButtonService
  ) {}

  ngOnInit(): void {
    console.log('component called');
    this.filterRequestSubscription = this.filtersvc
      .getCollectionFilterRequest()
      .subscribe((res) => {
        this.filterRequest = res.request;
        this.pageNumber = res.pageNumber;
        this.fetchCollections(this.collectionType);
      });
  }

  onFetchCollectionClick(collectionType: CollectionListType) {
    this.collectionType = collectionType;
    this.fetchCollections(collectionType);
  }

  fetchCollections(collectionType: CollectionListType) {
    const type: string =
      collectionType === CollectionListType.Unverified
        ? CollectionListType.Unverified
        : CollectionListType.All;

    const showButtonVisibility = type === CollectionListType.Unverified;
    this.btnsvc.setShowButtonVisibility(showButtonVisibility);

    if (!this.filterRequest) {
      return;
    }
    this.getCollections(this.filterRequest, this.pageNumber, type);
  }

  getCollections(
    filterRequest: FilterRequest,
    pageNumber: number,
    type: string
  ) {
    this.collectionsSubscription =
    this.Collectionmanager.getCollectionCenterId().subscribe((collectionCenterId)=>{ 
      console.log(collectionCenterId)
      this.collectionsvc.getCollections(1,filterRequest, pageNumber, type)
      .subscribe({
        next: (response) => {
          // console.log('Filter request sent successfully:', response.body);
          // this.collections = response.body || [];

          // if (!this.collections.length) {
          //   return;
          // }
          console.table(response);
          const paginationHeader = response.headers.get('X-Pagination');
          if (paginationHeader) {
            const paginationData = JSON.parse(paginationHeader);
            console.log('Total Pages:', paginationData.TotalPages);
            let totalPages = paginationData.TotalPages;
            this.filtersvc.sendTotalPages(totalPages);
          }

          let distinctfarmerIds = this.collections
            .map((item) => item.farmerId)
            .filter((number, index, array) => array.indexOf(number) === index);

          let farmerIdString = distinctfarmerIds.join(',');

          this.userNamesSubscription = this.usrsvc
            .getUserNamesWithId(farmerIdString)
            .subscribe((names) => {
              let farmerNames = names;
              this.collections.forEach((item) => {
                let matchingItem = farmerNames.find(
                  (element) => element.id === item.farmerId
                );
                if (matchingItem != undefined) {
                  item.farmerName = matchingItem.name;
                }
              })
            })
      
    },
    error:(err)=>{
      console.log(err);
    },
        complete:()=>{
          console.log('completed');
        }
        
        })
      })
      }
         
  ngOnDestroy(): void {
    this.filterRequestSubscription?.unsubscribe();
    this.collectionsSubscription?.unsubscribe();
    this.userNamesSubscription?.unsubscribe();
  }
}



