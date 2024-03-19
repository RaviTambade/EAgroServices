import { Component } from '@angular/core';
import { Invoicelist } from 'src/app/Models/invoicelist';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.css']
})
export class InvoicelistComponent {
  SelectedInvoiceId: number | null = null
  invoiceDetails:any|undefined
  invoicelist: Invoicelist[]=[]
constructor(private invoicesvc:InvoiceService){}
showPaid: boolean = true;
showUnpaid: boolean = false;

get filteredInvoice() {
  return this.invoicelist.filter((invoice: { paymentStatus: string; }) => {
    if (this.showPaid && this.showUnpaid) {
      return true; // Show all collections when both checkboxes are selected
    } else if (this.showPaid) {
      return invoice.paymentStatus === 'paid';
    } else if (this.showUnpaid) {
      return invoice.paymentStatus === 'unpaid';
    } else {
      return false; // Hide all collections when both checkboxes are deselected
    }
    
  });
}
  ngOnInit(): void {
    this.invoicesvc.getInvoicelist().subscribe((response)=>{
      this.invoicelist=response;
      console.log(response);
      if(response.length > 0){
      this.invoicesvc.setSelectedInvoiceId(response[0].invoiceId);
      }
    })
}
onClickDetails(invoiceId: number) {
   this.invoicesvc.setSelectedInvoiceId(invoiceId);
   console.log(invoiceId);
}
}
