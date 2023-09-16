import { Component, OnInit } from '@angular/core';
import { BankStatement } from 'src/app/Models/bank-statement';
import { CommonService } from 'src/app/Services/Common.service';

@Component({
  selector: 'app-bankstatement',
  templateUrl: './bankstatement.component.html',
  styleUrls: ['./bankstatement.component.css']
})
export class BankstatementComponent implements OnInit {
  farmerId:number|undefined;
    accountNumber: string | undefined;
    bankStatement:BankStatement[]=[];
    constructor(private bsvc:CommonService){}
    ngOnInit(): void {
      this.farmerId=Number(localStorage.getItem("userId"));
      this.bsvc.getFarmerAccountInfo(this.farmerId).subscribe((response)=>{
        console.log(this.farmerId);
        console.log(response);
       this.accountNumber= response.accountNumber;
       console.log(this.accountNumber);
       this.bsvc.getBankStatement(this.accountNumber).subscribe((statement)=>{
        this.bankStatement=statement;
        console.log(statement);
       })
      })
    } 
  }
  