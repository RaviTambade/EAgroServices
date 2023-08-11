import { Component, Input, OnInit } from '@angular/core';
import { ShipmentService } from '../shipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/payment.service';
import { TransporterService } from 'src/app/transporter/transporter.service';
import { CorporateService } from 'src/app/corporate.service';
import { AccountInfo } from '../account-info';
import { BankingService } from 'src/app/banking.service';
import { MerchantService } from '../merchant.service';
import { PaymentTransferDetails } from '../payment-transfer-details';
import { TransporterPayment } from 'src/app/transporter-payment';

@Component({
  selector: 'app-merchant-shipment-payment',
  templateUrl: './merchant-shipment-payment.component.html',
  styleUrls: ['./merchant-shipment-payment.component.css']
})
export class MerchantShipmentPaymentComponent implements OnInit {
  @Input() shipmentId!: number;
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
    this.shipmentsvc.getShipmentTransporterAmount(this.shipmentId).subscribe((transporterAmount) => {
      this.amount = transporterAmount.amount;
      this.paymentStatus = transporterAmount.paymentStatus;
      this.transportersvc.getCorporateIdOfTransporter(transporterAmount.transporterId).subscribe((corporateId) => {
        this.corpsvc.getCorporates(corporateId.toString()).subscribe((res) => {
          this.transporterName = res[0].name

          this.banksvc.getCorporateAccountInfo(res[0].id).subscribe((transporterAccount) => {
            this.transporterAccountInfo.accountNumber = transporterAccount.accountNumber;
            this.transporterAccountInfo.ifscCode = transporterAccount.ifscCode;
          });
        });
      });
    });

    this.merchantsvc.getMerchantCorporateId().subscribe((corpId) => {
      this.banksvc.getCorporateAccountInfo(corpId).subscribe((merchantAccount) => {
        this.merchantAccountInfo.accountNumber = merchantAccount.accountNumber;
        this.merchantAccountInfo.ifscCode = merchantAccount.ifscCode;
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
              console.log("payment done sucessfully")
            this.fetchShipmentPaymentInfo();
            }
          });
        }
      });
    }
  }
}
