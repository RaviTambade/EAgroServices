import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CollectionCenterFilterFor } from 'src/app/Shared/filter/collection-center-filter-for';
import { FilterRequest } from 'src/app/Shared/filter/filter-request';
import { FiltersService } from 'src/app/Shared/filter/filters.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { ShippedCollection } from 'src/app/collectioncenter/shipped-collection';
import { CorporateService } from 'src/app/corporate.service';
import { ShipmentStatus } from 'src/app/merchant/shipment-status';
import { ShipmentService } from 'src/app/merchant/shipment.service';

@Component({
  selector: 'app-collection-shipment-filter-list',
  templateUrl: './collection-shipment-filter-list.component.html',
  styleUrls: ['./collection-shipment-filter-list.component.css']
})
export class CollectionShipmentFilterListComponent {
  collections: ShippedCollection[] = [];
  shippedCollection = CollectionCenterFilterFor.shippedCollection;
  filterRequest:any;
  pageNumber:any;
  constructor( private filtersvc:FiltersService, private shipmentsvc: ShipmentService, private corpsvc: CorporateService, private usrsvc: UserService) { }

  ngOnInit(): void {

    this.filtersvc.getVerifiedCollectionFilterRequest().subscribe((res)=>{
      this.filterRequest = res.request;
      this.pageNumber = res.pageNumber;
    this.onInprogressClick();
  });
}

  onInprogressClick(){
    this.fetchCollections(this.filterRequest,this.pageNumber,ShipmentStatus.inprogress)
  }

  onDeliveredClick(){
    this.fetchCollections(this.filterRequest,this.pageNumber,ShipmentStatus.delivered)
  }

  fetchCollections( filterRequest:FilterRequest,pageNumber:number,status: string) {
    this.shipmentsvc.getShippedCollections(filterRequest,pageNumber,status).subscribe((response: HttpResponse<any[]>) => {
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
        let distinctcollectioncenterIds = this.collections.map(item => item.collectionCenterCorporateId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let distinctMerchantIds = this.collections.map(item => item.merchantCorporateId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let distinctTransporterIds = this.collections.map(item => item.transporterCorporateId)
          .filter((number, index, array) => array.indexOf(number) === index);


        let distinctfarmerIds = this.collections.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let collectionCenterIdString = distinctcollectioncenterIds.join(',');
        let farmerIdString = distinctfarmerIds.join(',');
        let merchantIdString = distinctMerchantIds.join(',');
        let transporterIdString = distinctTransporterIds.join(',');

        this.corpsvc.getCorporates(collectionCenterIdString).subscribe((names) => {
          let corporationNames = names
          this.collections.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.collectionCenterCorporateId);
            if (matchingItem != undefined)
              item.collectionCenterName = matchingItem.name;
          });
        });

        this.corpsvc.getCorporates(merchantIdString).subscribe((names) => {
          let corporationNames = names
          this.collections.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.merchantCorporateId);
            if (matchingItem != undefined)
              item.merchantName = matchingItem.name;
          });
        });

        this.corpsvc.getCorporates(transporterIdString).subscribe((names) => {
          let corporationNames = names
          this.collections.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.transporterCorporateId);
            if (matchingItem != undefined)
              item.transporteName = matchingItem.name;
          });
        });

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
