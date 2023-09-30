import { Component, OnInit,Pipe } from '@angular/core';
import { BankStatement } from 'src/app/Models/bank-statement';
import { BankingService } from 'src/app/Services/banking.service';
import { CollectioncenterService } from 'src/app/Services/collectioncenter.service';
import { CorporateService } from 'src/app/Services/corporate.service';


@Component({
  selector: 'collectioncenter-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.css']
})
export class BankingComponent implements OnInit {
  statement: BankStatement[] = []
  accountNumber: string = '';

  constructor(
    private corporateSvc: CorporateService,
    private banksvc: BankingService) { }

  ngOnInit(): void {
    this.corporateSvc.getCorporateIdByPersonId().subscribe((corporeateId) => {
      console.log(corporeateId);
      this.banksvc.getCorporateAccountInfo(corporeateId).subscribe((res) => {
        console.log(res);
        this.accountNumber = res.accountNumber;
        console.log(res.accountNumber);
        this.banksvc.getBankStatement(this.accountNumber).subscribe((statement) => {
          this.statement = statement
          console.log(statement)
        })
      });
    });
  }

}
