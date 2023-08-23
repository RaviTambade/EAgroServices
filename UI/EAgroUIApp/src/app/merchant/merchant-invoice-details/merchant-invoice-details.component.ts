import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountInfo } from 'src/app/Models/account-info';
import { FarmerServicePayment } from 'src/app/Models/farmer-service-payment';
import { InvoiceDetails } from 'src/app/Models/invoice-details';
import { NameId } from 'src/app/Models/name-id';
import { PaymentTransferDetails } from 'src/app/Models/payment-transfer-details';
import { BankingService } from 'src/app/Services/banking.service';
import { CorporateService } from 'src/app/Services/corporate.service';
import { InvoicesService } from 'src/app/Services/invoices.service';
import { MerchantService } from 'src/app/Services/merchant.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { UserService } from 'src/app/Shared/users/user.service';


@Component({
  selector: 'app-merchant-invoice-details',
  templateUrl: './merchant-invoice-details.component.html',
  styleUrls: ['./merchant-invoice-details.component.css']
})
export class MerchantInvoiceDetailsComponent implements OnInit {
  @Input() invoiceId: number | undefined;
  @Output() refetchData = new EventEmitter<void>();
  invoiceDetails: InvoiceDetails={
    id: 0,
    farmerId: 0,
    farmerName: '',
    collectionCenterCorporateId: 0,
    collectionCenterName: '',
    transporterCorporateId: 0,
    collectionId: 0,
    transporterName: '',
    vehicleNumber: '',
    cropName: '',
    grade: '',
    containerType: '',
    quantity: 0,
    totalWeight: 0,
    netWeight: 0,
    freightCharges: 0,
    labourCharges: 0,
    serviceCharges: 0,
    paymentStatus: '',
    ratePerKg: 0,
    farmerAmount: 0,
    invoiceDate: ''
  } ;
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
  constructor(
    private invoicesvc: InvoicesService, 
    private corppratesvc: CorporateService,
    private usersvc: UserService, 
    private banksvc: BankingService, 
    private paymentsvc: PaymentService,
    private merchantsvc: MerchantService) { 
      
    }


  ngOnInit(): void {
    this.fetchInvoiceDetails();
  }

  fetchInvoiceDetails() {
    if(!this.invoiceId){
      return
    }
    this.invoicesvc.getInvoiceDetails(this.invoiceId).subscribe((res) => {
      this.invoiceDetails = res;

      console.log(res)
      console.log(this.invoiceId)

      let ids: number[] = [this.invoiceDetails.collectionCenterCorporateId, this.invoiceDetails.transporterCorporateId];
      let idString = ids.join(',');


      this.corppratesvc.getCorporates(idString).subscribe((names: NameId[]) => {
        this.invoiceDetails.collectionCenterName = names[0].name
        this.invoiceDetails.transporterName = names[1].name

      });

      let farmerId: string = this.invoiceDetails.farmerId.toString();
      this.usersvc.getUserNamesWithId(farmerId).subscribe((response: any[]) => {
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

    this.merchantsvc.getMerchantCorporateId().subscribe((corpId) => {
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
      amount: this.invoiceDetails.farmerAmount
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
                if (response)
                  alert("payment done sucessfully")
                this.refetchData.emit();
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
