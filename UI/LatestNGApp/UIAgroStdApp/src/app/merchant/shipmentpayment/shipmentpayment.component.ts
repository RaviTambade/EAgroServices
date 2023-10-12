import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountInfo } from 'src/app/Models/account-info';
import { PaymentTransferDetails } from 'src/app/Models/payment-transfer-details';
import { TransporterPayment } from 'src/app/Models/transporter-payment';
import { BankingService } from 'src/app/Services/banking.service';
import { CorporateService } from 'src/app/Services/corporate.service';
import { MerchantService } from 'src/app/Services/merchant.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { ShipmentService } from 'src/app/Services/shipment.service';
import { TransporterService } from 'src/app/Services/transporter.service';

@Component({
  selector: 'app-shipmentpayment',
  templateUrl: './shipmentpayment.component.html',
  styleUrls: ['./shipmentpayment.component.css']
})
export class ShipmentpaymentComponent implements OnInit {
  @Input() shipmentId!: number;
  @Output() refetchData = new EventEmitter();
  transporterName: string = '';
  amount: number | undefined;
  paymentStatus: string = ''

  transporterAccountInfo: AccountInfo = {
    accountNumber: '',
    ifscCode: ''
  };

  merchantAccountInfo: AccountInfo = {
    accountNumber: '',
    ifscCode: ''
  };
  ispaymentButtonDisabled: boolean = false;

  constructor(private shipmentsvc: ShipmentService, private paymentsvc: PaymentService, private transportersvc: TransporterService,
    private corpsvc: CorporateService,
    private banksvc: BankingService, private merchantsvc: MerchantService) { }
  ngOnInit(): void {
    this.fetchShipmentPaymentInfo();

  }

  fetchShipmentPaymentInfo() {
    console.log(this.shipmentId);
    this.shipmentsvc.getShipmentTransporterAmount(this.shipmentId).subscribe((transporterAmount) => {
      this.amount = transporterAmount.amount;
      this.paymentStatus = transporterAmount.paymentStatus;
      console.log(transporterAmount);
      this.merchantsvc.getCorporateIdOfTransporter(transporterAmount.transporterId).subscribe((corporateId) => {
        console.log(corporateId)
        this.corpsvc.getCorporates(corporateId.toString()).subscribe((res) => {
          this.transporterName = res[0].name
          console.log((res[0].id))
          console.log((res))
          this.banksvc.getCorporateAccountInfo(res[0].id).subscribe((transporterAccount) => {
            console.log(transporterAccount)
            this.transporterAccountInfo.accountNumber = transporterAccount.accountNumber;
            this.transporterAccountInfo.ifscCode = transporterAccount.ifscCode;


            this.merchantsvc.getmerchantIdByUserId().subscribe((merchantId) => {
              console.log(merchantId)
              this.merchantsvc.getMerchantCorporatesId(merchantId).subscribe((corpId) => {
                console.log(corpId)
                this.banksvc.getCorporateAccountInfo(corpId).subscribe((merchantAccount) => {
                  console.log(merchantAccount)
                  this.merchantAccountInfo.accountNumber = merchantAccount.accountNumber;
                  this.merchantAccountInfo.ifscCode = merchantAccount.ifscCode;
                });
              });
            })
          });
        });
      });
    });
  }

  onClickPay() {

    this.ispaymentButtonDisabled = true;
    if (this.amount != undefined) {
      let transportPaymentTransfer: PaymentTransferDetails = {
        fromAcct: this.merchantAccountInfo.accountNumber,
        toAcct: this.transporterAccountInfo.accountNumber,
        fromIfsc: this.merchantAccountInfo.ifscCode,
        toIfsc: this.transporterAccountInfo.ifscCode,
        amount: this.amount
      }

      this.banksvc.fundTransfer(transportPaymentTransfer).subscribe((res) => {
        if (res != 0) {

          let tarnsporterPayment: TransporterPayment = {
            transactionId: res,
            amount: transportPaymentTransfer.amount,
            shipmentId: this.shipmentId
          };


          this.paymentsvc.addTransporterPayment(tarnsporterPayment).subscribe((response) => {
            if (response) {
              alert("payment done sucessfully")
              this.refetchData.emit();
            }
          });
        }
      });
    }
  }
}


