import { Component, OnInit } from '@angular/core';
import { BankStatement } from 'src/app/Models/bank-statement';
import { BankingService } from 'src/app/Services/banking.service';
import { TransporterService } from 'src/app/Services/transporter.service';

@Component({
  selector: 'app-bankstatement',
  templateUrl: './bankstatement.component.html',
  styleUrls: ['./bankstatement.component.css']
})
export class BankstatementComponent implements OnInit {
  statements: BankStatement[] = [];
  accountNumber: string = '';
  transporterId:number=0
  corporateId:number=0
  constructor(
    private transportersvc: TransporterService,
    private banksvc: BankingService
  ) {}
  ngOnInit(): void {
    this.transportersvc.gettransporterIdByUserId().subscribe((res)=>{
      this.transporterId=res
    this.transportersvc.getCorporateIdOfTransporter(this.transporterId).subscribe((res) => {
      this.corporateId=res
        this.banksvc.getCorporateAccountInfo(this.corporateId).subscribe((res) => {
          this.accountNumber = res.accountNumber;
          this.banksvc.getBankStatement(this.accountNumber).subscribe((statement) => {
              this.statements = statement;
              console.log(statement);
            });
          })
        });
  })
  }
}
