import { Component, OnInit } from '@angular/core';
import { BankStatement } from 'src/app/bank-statement';
import { BankingService } from 'src/app/banking.service';
import { CollectioncenterService } from 'src/app/collectioncenter.service';
import { TransporterService } from '../transporter.service';

@Component({
  selector: 'app-transporterbanking',
  templateUrl: './transporterbanking.component.html',
  styleUrls: ['./transporterbanking.component.css']
})
export class TransporterbankingComponent implements OnInit {
  statement:BankStatement[]=[]
  accountNumber: string = '';
  constructor(private transportersvc: TransporterService, private banksvc: BankingService) { }
  ngOnInit(): void {
    this.transportersvc.getCorporateIdOfTransporter().subscribe((corporeateId) => {
      this.banksvc.getCorporateAccountInfo(corporeateId).subscribe((res) => {
        this.accountNumber = res.accountNumber;
        this.banksvc.getBankStatement(this.accountNumber).subscribe((statement) => {
          this.statement=statement
          console.log(statement)
        })
      });
    });
  }
}
