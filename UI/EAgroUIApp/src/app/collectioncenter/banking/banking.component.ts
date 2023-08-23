import { Component, OnInit } from '@angular/core';
import { BankStatement } from 'src/app/Models/bank-statement';
import { BankingService } from 'src/app/Services/banking.service';
import { CollectioncenterService } from 'src/app/Services/collectioncenter.service';


@Component({
  selector: 'collectioncenter-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {
  statement:BankStatement[]=[]
  accountNumber: string = '';
  constructor(private collectioncentersvc: CollectioncenterService, private banksvc: BankingService) { }
  ngOnInit(): void {
    this.collectioncentersvc.getCorporateIdByCollectionCenterId().subscribe((corporeateId) => {
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
