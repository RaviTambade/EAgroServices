import { Component } from '@angular/core';
import { Invoicelist } from 'src/app/Models/invoicelist';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.css']
})
export class InvoicelistComponent {
  invoicelist: Invoicelist[]|undefined
constructor(private invoicesvc:InvoiceService){}
  ngOnInit(): void {
    this.invoicesvc.getInvoicelist().subscribe((response)=>{
      this.invoicelist=response;
      console.log(response);

    })
}
}