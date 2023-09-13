import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-totalinvoice',
  templateUrl: './totalinvoice.component.html',
  styleUrls: ['./totalinvoice.component.css']
})
export class TotalinvoiceComponent implements OnInit {
  constructor(private router:Router,private invoicesvc:InvoiceService){}
 
  ngOnInit(): void {
  }


}
