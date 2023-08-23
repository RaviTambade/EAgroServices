import { Component, OnInit } from '@angular/core';
import { BankStatement } from 'src/app/Models/bank-statement';
import { BankingService } from 'src/app/Services/banking.service';

@Component({
  selector: 'app-farmerbanking',
  templateUrl: './farmerbanking.component.html',
  styleUrls: ['./farmerbanking.component.css']
})
export class FarmerbankingComponent implements OnInit {
farmerId:number|undefined;
  accountNumber: string | undefined;
  bankStatement:BankStatement[]=[];
  constructor(private bsvc:BankingService){}
  ngOnInit(): void {
    this.farmerId=Number(localStorage.getItem("farmerId"));
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
