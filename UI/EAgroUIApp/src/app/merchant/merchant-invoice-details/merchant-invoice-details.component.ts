import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Shared/users/user.service';
import { CorporateService } from 'src/app/corporate.service';
import { InvoicesService } from 'src/app/invoices.service';
import { InvoiceDetails } from '../invoice-details';
import { BankingService } from 'src/app/banking.service';
import { AccountInfo } from '../account-info';
import { PaymentTransferDetails } from '../payment-transfer-details';
import { PaymentService } from 'src/app/payment.service';
import { FarmerServicePayment } from 'src/app/farmer-service-payment';
import { MerchantService } from '../merchant.service';
import { NameId } from 'src/app/name-id';

@Component({
  selector: 'app-merchant-invoice-details',
  templateUrl: './merchant-invoice-details.component.html',
  styleUrls: ['./merchant-invoice-details.component.css']
})
export class MerchantInvoiceDetailsComponent implements OnInit {
  invoiceId: string | any;
  invoiceDetails!: InvoiceDetails;
  showPayment: boolean = false;
  farmerAccountInfo: AccountInfo = {
    accountNumber: '',
    ifscCode: ''
  };
  collectionCenterAccountInfo: AccountInfo = {
    accountNumber: '',
    ifscCode: ''
  };

  merchantAccountInfo: AccountInfo = {
    accountNumber: '',
    ifscCode: ''
  };
  ispaymentButtonDisabled: boolean = false;
  constructor(private invoicesvc: InvoicesService, private corpsvc: CorporateService,
    private usrsvc: UserService, private banksvc: BankingService, private paymentsvc: PaymentService,
    private merchantsvc: MerchantService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = params.get('invoiceid');
    });

    this.invoicesvc.getInvoiceDetails(this.invoiceId).subscribe((res) => {
      this.invoiceDetails = res;

      let ids: number[] = [this.invoiceDetails.collectionCenterCorporateId, this.invoiceDetails.transporterCorporatId];
      let idString = ids.join(',');


      this.corpsvc.getCorporates(idString).subscribe((names: NameId[]) => {
        this.invoiceDetails.collectionCenterName = names[0].name
        this.invoiceDetails.transporterName = names[1].name

      });

      let farmerId: string = this.invoiceDetails.farmerId.toString();
      this.usrsvc.getUserNamesWithId(farmerId).subscribe((response: any[]) => {
        this.invoiceDetails.farmerName = response[0].name
      });

    });
  }

  updateRate(invoiceId: number) {

    let body = { "ratePerKg": this.invoiceDetails.ratePerKg }
    this.invoicesvc.updateRate(invoiceId, body).subscribe((res) => {
      window.location.reload();
    });
  }

  onClickPaymentDetails() {
    this.banksvc.getFarmerAccountInfo(this.invoiceDetails.farmerId).subscribe((res) => {
      this.farmerAccountInfo.accountNumber = res.accountNumber;
      this.farmerAccountInfo.ifscCode = res.ifscCode;
    });

    this.banksvc.getCorporateAccountInfo(this.invoiceDetails.collectionCenterCorporateId).subscribe((res) => {
      this.collectionCenterAccountInfo.accountNumber = res.accountNumber;
      this.collectionCenterAccountInfo.ifscCode = res.ifscCode;
    });

    this.merchantsvc. getMerchantCorporateId().subscribe((corpId) => {
      this.banksvc.getCorporateAccountInfo(corpId).subscribe((res) => {
        this.merchantAccountInfo.accountNumber = res.accountNumber;
        this.merchantAccountInfo.ifscCode = res.ifscCode;
      });
    });

    this.showPayment = true;
  }

  onClickPay() {
    this.ispaymentButtonDisabled = true;
    let farmerPaymentTransfer: PaymentTransferDetails = {
      fromAcct: this.merchantAccountInfo.accountNumber,
      toAcct: this.farmerAccountInfo.accountNumber,
      fromIfsc: this.merchantAccountInfo.ifscCode,
      toIfsc: this.farmerAccountInfo.ifscCode,
      amount: this.invoiceDetails.totalAmount
    }

    this.banksvc.fundTransfer(farmerPaymentTransfer).subscribe((res) => {
      if (res != 0) {

        let farmerPayment: FarmerServicePayment = {
          collectionId: this.invoiceDetails.collectionId,
          transactionId: res,
          amount: farmerPaymentTransfer.amount,
          paymentFor: "farmer"
        };


        this.paymentsvc.addFarmerServicepayment(farmerPayment).subscribe((response) => {
       

        let serviceOwnerPaymentTransfer: PaymentTransferDetails = {
          fromAcct: this.merchantAccountInfo.accountNumber,
          toAcct: this.collectionCenterAccountInfo.accountNumber,
          fromIfsc: this.merchantAccountInfo.ifscCode,
          toIfsc: this.collectionCenterAccountInfo.ifscCode,
          amount: this.invoiceDetails.serviceCharges + this.invoiceDetails.labourCharges
        }



        this.banksvc.fundTransfer(serviceOwnerPaymentTransfer).subscribe((res) => {
          if (res != 0) {

            let serviceOwnerPayment: FarmerServicePayment = {
              collectionId: this.invoiceDetails.collectionId,
              transactionId: res,
              amount: serviceOwnerPaymentTransfer.amount,
              paymentFor: "serviceowner"
            };


            this.paymentsvc.addFarmerServicepayment(serviceOwnerPayment).subscribe((response) => {
              window.location.reload();
            });
          }
          else
            console.log("error while transfering funds to service owner");
        });
      });
      }
      else
        console.log("error while transfering funds to farmer");
    });
  }
}
