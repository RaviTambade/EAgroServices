import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterRequest } from '../filter-request';
import { FiltersService } from '../filters.service';
import { UserService } from '../../users/user.service';
import { UserRoleService } from 'src/app/user-role.service';
import { NameId } from 'src/app/name-id';
import { MerchantService } from 'src/app/merchant/merchant.service';
import { Corporate } from 'src/app/corporate';
import { CorporateService } from 'src/app/corporate.service';
import { CollectioncenterService } from 'src/app/collectioncenter.service';
import { TransporterService } from 'src/app/transporter/transporter.service';

@Component({
  selector: 'app-range-filter',
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.css']
})
export class RangeFilterComponent implements OnInit {

  @Input() filterRequest!: FilterRequest;
  @Input() filterFor!: string;
  @Output() filterChange = new EventEmitter<void>();
  expandedPropertyIndex: number = 0;
  rangeProperties: string[] = [];
  isButtonClicked: boolean = false;
  initializationDone: boolean = false;
  farmers: NameId[] = [];
  inspectors: NameId[] = [];

  merchants: Corporate[] = [];
  collectionCenters: Corporate[] = [];
  transporters: Corporate[] = [];

  constructor(private filterservice: FiltersService, private usrsvc: UserService, private userrolesvc: UserRoleService,
    private merchantsvc: MerchantService, private corpsvc: CorporateService,
    private collectionCentersvc: CollectioncenterService, private transportersvc: TransporterService) { }

  ngOnInit(): void {

    this.filterservice.getRangeProperties(this.filterFor).subscribe((response) => {
      this.rangeProperties = response;
      if (!this.initializationDone) {
        if (!this.doesPreviousRequestContainsRangeProperties()) {
          this.initializeRangeFilters();
        }
        this.initializationDone = true;
      }

      if (this.rangeProperties.includes("FarmerId")) {
        this.userrolesvc.getusersId("farmer").subscribe((res) => {
          this.usrsvc.getUserNamesWithId(res).subscribe((farmers) => {
            this.farmers = farmers;
          });
        });
      }

      if (this.rangeProperties.includes("InspectorId")) {
        this.userrolesvc.getusersId("inspector").subscribe((res) => {
          this.usrsvc.getUserNamesWithId(res).subscribe((inspectors) => {
            this.inspectors = inspectors;
          });
        });
      }


      if (this.rangeProperties.includes("MerchantCorporateId")) {
        this.merchantsvc.getMerchantAndCorporateId().subscribe((res) => {
          this.merchants = res;
          let distinctmerchantIds = this.merchants.map(item => item.corporateId)
            .filter((number, index, array) => array.indexOf(number) === index);
          let merchantIdString = distinctmerchantIds.join(',')
          this.corpsvc.getCorporates(merchantIdString).subscribe((names) => {
            let corporationNames = names
            this.merchants.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.corporateId);
              if (matchingItem != undefined)
                item.name = matchingItem.name;
            });
          });
        });
      }
      if (this.rangeProperties.includes("CollectionCenterCorporateId")) {
        this.collectionCentersvc.getCollectionCenterAndCorporateId().subscribe((res) => {
          this.collectionCenters = res;
          let distinctcollectionCenterIds = this.collectionCenters.map(item => item.corporateId)
            .filter((number, index, array) => array.indexOf(number) === index);
          let CollectionCenterIdString = distinctcollectionCenterIds.join(',')
          this.corpsvc.getCorporates(CollectionCenterIdString).subscribe((names) => {
            let corporationNames = names
            this.collectionCenters.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.corporateId);
              if (matchingItem != undefined)
                item.name = matchingItem.name;
            });
          });
        });
      }

      if (this.rangeProperties.includes("TransporterCorporateId")) {
        this.transportersvc.getTransporterAndCorporateId().subscribe((res) => {
          this.transporters = res;
          let distinctTransporterIds = this.transporters.map(item => item.corporateId)
            .filter((number, index, array) => array.indexOf(number) === index);
          let transporterIdString = distinctTransporterIds.join(',')
          this.corpsvc.getCorporates(transporterIdString).subscribe((names) => {
            let corporationNames = names
            this.transporters.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.corporateId);
              if (matchingItem != undefined)
                item.name = matchingItem.name;
            });
          });
        });
      }
    });

  }

  initializeRangeFilters() {
    this.filterRequest.rangeFilters = this.rangeProperties.map(property => {
      return { propertyName: property, minValue: undefined, maxValue: undefined };
    });
  }

  setMaxValue(index: number) {
    const minVal = this.filterRequest.rangeFilters[index].minValue;
    this.filterRequest.rangeFilters[index].maxValue = minVal;

  }
  onSubmit() {
    this.filterChange.emit();
    this.isButtonClicked = true;
    setTimeout(() => {
      this.isButtonClicked = false;
    }, 500);
  }


  toggleProperty(index: number): void {
    this.expandedPropertyIndex = index;
  }

  isPropertyExpanded(index: number): boolean {
    return this.expandedPropertyIndex === index;
  }

  doesPreviousRequestContainsRangeProperties(): boolean {
    const prevFilterRequest = sessionStorage.getItem("prevFilterRequest");
    if (prevFilterRequest != null) {
      const filterRequest: FilterRequest = JSON.parse(prevFilterRequest);
      return filterRequest.rangeFilters.length > 0
    }
    return false;
  }

  propertyIsNotPersonOrCorporateId( property :string) :boolean{
    return property !== 'FarmerId' && property !== 'InspectorId' && property !== 'MerchantCorporateId'
    && property !== 'CollectionCenterCorporateId'  && property !== 'TransporterCorporateId';
  }

}
