import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionCenterFilterFor } from 'src/app/Shared/filter/collection-center-filter-for';
import { FiltersService } from 'src/app/Shared/filter/filters.service';
import { UserService } from 'src/app/Shared/users/user.service';
import { CorporateService } from 'src/app/corporate.service';
import { InvoicesService } from 'src/app/invoices.service';
import { Invoice } from 'src/app/merchant/invoice';

enum PaymentListType {
  Paid = "paid",
  Unpaid = "unpaid"
}
@Component({
  selector: 'app-collection-payment-list-filter',
  templateUrl: './collection-payment-list-filter.component.html',
  styleUrls: ['./collection-payment-list-filter.component.css']
})

export class CollectionPaymentListFilterComponent implements OnInit,OnDestroy {
  PaymentListType=PaymentListType;
  
  collectionInvoices: Invoice[] = [];
  collectionPayments = CollectionCenterFilterFor.collectionPayments;
  filterRequest:any;
  pageNumber: number=1;

  paymentStatus=PaymentListType.Unpaid;

  private filterRequestSubscription: Subscription | undefined;
  private invoicesSubscription: Subscription | undefined;
  private corporationsSubscription: Subscription | undefined;
  private userNamesSubscription: Subscription | undefined;
  
  constructor(private invoicesvc: InvoicesService, private corpsvc: CorporateService, private usrsvc: UserService,
    private filtersvc: FiltersService,) { }
  ngOnInit(): void {
    this.filterRequestSubscription =  this.filtersvc.getCollectionPaymentListFilterRequest().subscribe((res) => {
      this.filterRequest = res.request;
      this.pageNumber = res.pageNumber;
      this.fetchInvoices();
    });
  }

  onFetchInvoicesClick(paymentStatus: PaymentListType) {
    this.paymentStatus = paymentStatus;
    this.fetchInvoices();
  }

  fetchInvoices() {
    const type: string = this.paymentStatus === PaymentListType.Unpaid ? PaymentListType.Unpaid : PaymentListType.Paid;
    this.fetchData(this.filterRequest, this.pageNumber, type);
  }

  fetchData(filterRequest: any, pageNumber: number,status:string) {
    this.invoicesSubscription = this.invoicesvc.getCollectionCenterInvoices(filterRequest,pageNumber,status).subscribe((response: HttpResponse<any[]>) => {
      console.log('Filter request sent successfully:', response.body);
      this.collectionInvoices = response.body || [];
      console.table(this.collectionInvoices)
      const paginationHeader = response.headers.get('X-Pagination');
      if (paginationHeader) {
        const paginationData = JSON.parse(paginationHeader);
        console.log('Total Pages:', paginationData.TotalPages);
        let totalPages = paginationData.TotalPages;
        this.filtersvc.sendTotalPages(totalPages);
      }
      if (this.collectionInvoices.length != 0) {

        let distinctfarmerIds = this.collectionInvoices.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let farmerIdString = distinctfarmerIds.join(',');

        let distinctMerchantIds = this.collectionInvoices.map(item => item.merchantCorporateId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let merchantIdString = distinctMerchantIds.join(',');

      this.corporationsSubscription=  this.corpsvc.getCorporates(merchantIdString).subscribe((names) => {
          let corporationNames = names
          this.collectionInvoices.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.merchantCorporateId);
            if (matchingItem != undefined)
              item.merchantName = matchingItem.name;
          });
        });

        this.userNamesSubscription= this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
          let farmerNames = names
          this.collectionInvoices.forEach(item => {
            let matchingItem = farmerNames.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.name;
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.filterRequestSubscription) {
      this.filterRequestSubscription.unsubscribe();
    }
    if (this.invoicesSubscription) {
      this.invoicesSubscription.unsubscribe();
    }
    if (this.corporationsSubscription) {
      this.corporationsSubscription.unsubscribe();
    }
    if (this.userNamesSubscription) {
      this.userNamesSubscription.unsubscribe();
    }
  }

}
