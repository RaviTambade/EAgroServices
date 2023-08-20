import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { FilterRequest } from './filter-request';
import { CollectionCenterFilterFor } from './collection-center-filter-for';
import { UserService } from '../users/user.service';
import { UserRoleService } from 'src/app/user-role.service';
import { CorporateService } from 'src/app/corporate.service';
import { MerchantService } from 'src/app/merchant/merchant.service';
import { CollectioncenterService } from 'src/app/collectioncenter.service';
import { TransporterService } from 'src/app/transporter/transporter.service';
import { Corporate } from 'src/app/corporate';
import { NameId } from 'src/app/name-id';


type requestObject = {
  request: FilterRequest
  pageNumber: number
};

@Injectable({
  providedIn: 'root'
})
export class FiltersService {


  private toatalPages = new Subject<number>();
  private verifiedCollectionFilterRequestSender = new Subject<requestObject>();
  private CollectionFilterRequestSender = new Subject<requestObject>();
  private ShippedCollectionFilterRequestSender = new Subject<requestObject>();
  private collectionPaymentListFilterRequestSender = new Subject<requestObject>();

  private displayNameMap = [
    { key: 'FarmerId', value: 'Farmer' },
    { key: 'MerchantCorporateId', value: 'Merchant' },
    { key: 'CollectionCenterCorporateId', value: 'CollectionCenter' },
    { key: 'TransporterCorporateId', value: 'Transporter' },
    { key: 'InspectorId', value: 'Inspector' },
  ];

  constructor(private http: HttpClient, private usrsvc: UserService, private userrolesvc: UserRoleService,
    private merchantsvc: MerchantService, private corpsvc: CorporateService,
    private collectionCentersvc: CollectioncenterService, private transportersvc: TransporterService) { }

  getDisplayNamesMap() {
    return this.displayNameMap
  }
  
  displayPropertyName(property: string): string {
    const mapping = this.displayNameMap.find(map => map.key === property);
    return mapping?.value || property;
  }

  sendTotalPages(data: number) {
    this.toatalPages.next(data);
  }

  getTotalPages() {
    return this.toatalPages.asObservable();
  }

  sendVerifiedCollectionFilterRequest(filterRequest: FilterRequest, pageNumber: number) {
    this.verifiedCollectionFilterRequestSender.next({ request: filterRequest, pageNumber: pageNumber });
  }

  getVerifiedCollectionFilterRequest() {
    return this.verifiedCollectionFilterRequestSender.asObservable();
  }

  sendShippedCollectionFilterRequest(filterRequest: FilterRequest, pageNumber: number) {
    this.ShippedCollectionFilterRequestSender.next({ request: filterRequest, pageNumber: pageNumber });
  }

  getShippedCollectionFilterRequest() {
    return this.ShippedCollectionFilterRequestSender.asObservable();
  }

  sendCollectionFilterRequest(filterRequest: FilterRequest, pageNumber: number) {
    this.CollectionFilterRequestSender.next({ request: filterRequest, pageNumber: pageNumber });
  }

  getCollectionFilterRequest() {
    return this.CollectionFilterRequestSender.asObservable();
  }

  sendCollectionPaymentListFilterRequest(filterRequest: FilterRequest, pageNumber: number) {
    this.collectionPaymentListFilterRequestSender.next({ request: filterRequest, pageNumber: pageNumber });
  }

  getCollectionPaymentListFilterRequest() {
    return this.collectionPaymentListFilterRequestSender.asObservable();
  }


  getCrops(): Observable<any> {
    let url = "http://localhost:5250/api/crops/names"
    return this.http.get<any>(url);
  }

  getContainerTypes(): Observable<any> {
    let url = "http://localhost:5239/api/verifiedcollections/containertypes"
    return this.http.get<any>(url);
  }

  getGrades(): Observable<any> {
    let url = "http://localhost:5239/api/verifiedcollections/grades"
    return this.http.get<any>(url);
  }

  getVehicles() {
    let url = "http://localhost:5261/api/vehicles/numbers"
    return this.http.get<any>(url);
  }


  getAllProperties(filterFor: string): Observable<any> {
    let url = ''
    switch (filterFor) {
      case CollectionCenterFilterFor.collection:
        url = "http://localhost:5154/api/collections/filterhelper/getpropertynames";
        break;
      case CollectionCenterFilterFor.verifiedCollection:
        url = "http://localhost:5154/api/verifiedcollectiondetails/filterhelper/getpropertynames";
        break;

      case CollectionCenterFilterFor.shippedCollection:
        url = "http://localhost:5067/api/shippedcollections/filterhelper/getpropertynames"
        break;

      case CollectionCenterFilterFor.collectionPayments:
        url = "http://localhost:5197/api/collectioncenterinvoice/filterhelper/getpropertynames"
        break;

    }
    return this.http.get<any>(url);

  }


  getEqualProperties(filterFor: string): Observable<any> {
    let url = ''
    switch (filterFor) {
      case CollectionCenterFilterFor.collection:
        url = "http://localhost:5154/api/collections/filterhelper/getequalproperties";
        break;
      case CollectionCenterFilterFor.verifiedCollection:
        url = "http://localhost:5154/api/verifiedcollectiondetails/filterhelper/getequalproperties"
        break;
      case CollectionCenterFilterFor.shippedCollection:
        url = "http://localhost:5067/api/shippedcollections/filterhelper/getequalproperties"
        break;
      case CollectionCenterFilterFor.collectionPayments:
        url = "http://localhost:5197/api/collectioncenterinvoice/filterhelper/getequalproperties"
        break;
    }
    return this.http.get<any>(url);
  }

  getRangeProperties(filterFor: string): Observable<string[]> {
    let url = ''
    switch (filterFor) {
      case CollectionCenterFilterFor.collection:
        url = "http://localhost:5154/api/collections/filterhelper/getrangeproperties";
        break;
      case CollectionCenterFilterFor.verifiedCollection:
        url = "http://localhost:5154/api/verifiedcollectiondetails/filterhelper/getrangeproperties"
        break;
      case CollectionCenterFilterFor.shippedCollection:
        url = "http://localhost:5067/api/shippedcollections/filterhelper/getrangeproperties"
        break;
      case CollectionCenterFilterFor.collectionPayments:
        url = "http://localhost:5197/api/collectioncenterinvoice/filterhelper/getrangeproperties"
        break;
    }
    return this.http.get<any>(url);
  }

  getDateRangeProperties(filterFor: string): Observable<any> {
    let url = ''
    switch (filterFor) {
      case CollectionCenterFilterFor.collection:
        url = "http://localhost:5154/api/collections/filterhelper/getdaterangeproperties";
        break;
      case CollectionCenterFilterFor.verifiedCollection:
        url = "http://localhost:5154/api/verifiedcollectiondetails/filterhelper/getdaterangeproperties"
        break;
      case CollectionCenterFilterFor.shippedCollection:
        url = "http://localhost:5067/api/shippedcollections/filterhelper/getdaterangeproperties"
        break;
      case CollectionCenterFilterFor.collectionPayments:
        url = "http://localhost:5197/api/collectioncenterinvoice/filterhelper/getdaterangeproperties"
        break;
    }
    return this.http.get<any>(url);
  }

  getFarmers(): Observable<NameId[]> {
    return this.userrolesvc.getusersId("farmer").pipe(
      switchMap((res) => this.usrsvc.getUserNamesWithId(res))
    );
  }
  getInspectors(): Observable<NameId[]> {
    return this.userrolesvc.getusersId("inspector").pipe(
      switchMap((res) => this.usrsvc.getUserNamesWithId(res))
    );
  }

  getMerchants(): Observable<Corporate[]> {
    return this.merchantsvc.getMerchantAndCorporateId().pipe(
      switchMap((res) => {
        let merchants = res;
        let distinctmerchantIds = merchants.map(item => item.corporateId)
          .filter((number, index, array) => array.indexOf(number) === index);
        let merchantIdString = distinctmerchantIds.join(',');

        return this.corpsvc.getCorporates(merchantIdString).pipe(
          map((names) => {
            let corporationNames = names;
            merchants.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.corporateId);
              if (matchingItem != undefined) {
                item.name = matchingItem.name;
              }
            });
            return merchants;
          })
        );
      })
    );
  }

  getCollectionCenters(): Observable<Corporate[]> {

    return this.collectionCentersvc.getCollectionCenterAndCorporateId().pipe(
      switchMap((res) => {
        let collectionCenters = res;
        let distinctcollectionCenterIds = collectionCenters.map(item => item.corporateId)
          .filter((number, index, array) => array.indexOf(number) === index);
        let CollectionCenterIdString = distinctcollectionCenterIds.join(',')

        return this.corpsvc.getCorporates(CollectionCenterIdString).pipe(
          map((names) => {
            let corporationNames = names
            collectionCenters.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.corporateId);
              if (matchingItem != undefined)
                item.name = matchingItem.name;
            });
            return collectionCenters;
          })
        );
      })
    );
  }

  getTransporters(): Observable<Corporate[]> {
    return this.transportersvc.getTransporterAndCorporateId().pipe(
      switchMap((res) => {
        let transporters = res;
        let distinctTransporterIds = transporters.map(item => item.corporateId)
          .filter((number, index, array) => array.indexOf(number) === index);
        let transporterIdString = distinctTransporterIds.join(',')

        return this.corpsvc.getCorporates(transporterIdString).pipe(
          map((names) => {
            let corporationNames = names
            transporters.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.corporateId);
              if (matchingItem != undefined)
                item.name = matchingItem.name;
            });
            return transporters;
          })
        );
      })
    );
  }

}
