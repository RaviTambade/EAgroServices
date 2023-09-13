import { Component, OnInit } from '@angular/core';
import { Invoicedetails } from 'src/app/Models/invoicedetails';
import { CommonService } from 'src/app/Services/Common.service';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoicedetails',
  templateUrl: './invoicedetails.component.html',
  styleUrls: ['./invoicedetails.component.css']
})
export class InvoicedetailsComponent implements OnInit {
  selectedInvoiceId: number| null = null;
   invoiceDetails:Invoicedetails|undefined
   invoiceId:any;
   requestDetails: any; 
   details:boolean=false;
 constructor(private invoiceSvc:InvoiceService,private commonSvc:CommonService){}
   ngOnInit(): void {
   
     this.invoiceSvc.setSelectedInvoiceId$.subscribe((invoiceId) => {
       this.invoiceId = invoiceId;
       if(this.invoiceId)
       this.invoiceSvc.getInvoiceDetails(this.invoiceId).subscribe((response)=>{
         console.log(this.invoiceId)
         console.log(this.invoiceId);
         this.invoiceDetails=response;
         })
       });
   }


 }
 