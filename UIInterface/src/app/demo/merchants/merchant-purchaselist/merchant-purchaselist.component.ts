import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../../Services/merchant.service';
import { VarietyService } from 'src/app/Services/variety.service';
import { Merchant } from 'src/app/Models/merchant';
import { Merchantsellviewmodel } from 'src/app/Models/Merchant-sell-viewmodel';

@Component({
  selector: 'app-merchant-purchaselist',
  templateUrl: './merchant-purchaselist.component.html',
  styleUrls: ['./merchant-purchaselist.component.scss']
})
export class MerchantPurchaselistComponent {
  merchant: Merchant | undefined;
  @Input() merchantId: string | number;
  @Input() callFromParent: boolean = false;
  MerchantsellViewModel: Merchantsellviewmodel[];
  MerchantsellViewModel1: Merchantsellviewmodel[];
  sortBy: string | undefined;
  sortOrder: string | undefined;
  filterStartDate: any;
  filterEndDate: any;
  filterVariety: any;
  filterGrade: any;
  showFilters: boolean = false;
  varieties: any;
  constructor(private svc: MerchantService, private route: ActivatedRoute,private varietysvc:VarietyService) { }
  ngOnInit(): void {
    if (this.merchantId == undefined) {
      this.route.paramMap.subscribe((params) => {
        console.log(params)
        this.merchantId = params.get('id');
      });
    }
    this.svc.getMerchantHistory(this.merchantId).subscribe((response) => {
      this.MerchantsellViewModel = response.slice(0, 5);
      this.MerchantsellViewModel1 = response;
      console.log(this.MerchantsellViewModel);
    })
  }

  getVarities() {
    this.varietysvc.getAllVarieties().subscribe((response) => {
      this.varieties = response;
    })
  }

  cancelFilters() {
    this.showFilters = false;

  }

  onSortChange() {
    console.log(this.sortBy)
    console.log(this.sortOrder)
    if (this.sortOrder != undefined)
      this.MerchantsellViewModel = this.sortObjectsByProperty(this.MerchantsellViewModel1, this.sortBy, this.sortOrder);
  }


  sortObjectsByProperty(objects: Merchantsellviewmodel[], property: string, sortOrder: string) {
    const sortedObjects = objects.slice();

    sortedObjects.sort((a, b) => {
      let aValue = a[property];
      let bValue = b[property];
      if (sortOrder == 'asc') {
        return aValue > bValue ? 1 : -1;
      } else if (sortOrder == 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      else {
        return 0;
      }
    });
    return sortedObjects;
  }

  onFilterSubmit() {
    let filteredPurchases = this.MerchantsellViewModel1;

    if (this.filterStartDate && this.filterEndDate) {
      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = p.date.slice(0, 10);
        return purchaseDate >= this.filterStartDate
          && purchaseDate <= this.filterEndDate;
      });
    } else if (this.filterStartDate) {
      console.log("send date from here", this.filterStartDate)
      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = p.date.slice(0, 10);
        console.log("from api date", purchaseDate);
        return purchaseDate >= this.filterStartDate;
      });
    } else if (this.filterEndDate) {
      console.log("send date from here", this.filterEndDate)

      filteredPurchases = filteredPurchases.filter(p => {
        const purchaseDate = p.date.slice(0, 10);
        console.log("from api date", purchaseDate);
        return purchaseDate <= this.filterEndDate;
      });
    }

    if (this.filterVariety) {
      console.log(this.filterVariety)
      filteredPurchases = filteredPurchases.filter(p => p.varietyName.toLowerCase().includes(this.filterVariety.toLowerCase()));
    }

    if (this.filterGrade) {
      filteredPurchases = filteredPurchases.filter(p => p.grade.toLowerCase().includes(this.filterGrade.toLowerCase()));
    }
    this.MerchantsellViewModel = filteredPurchases;
    this.showFilters = false;
  }
  showAllRecords() {
    this.MerchantsellViewModel = this.MerchantsellViewModel1
  }
}
