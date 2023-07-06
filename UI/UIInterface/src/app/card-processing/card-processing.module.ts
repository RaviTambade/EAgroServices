import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { DebitcardComponent } from './debitcard/debitcard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CardService } from './card.service';



@NgModule({
  declarations: [
    CreditcardComponent,
    DebitcardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  providers:[
    CardService
  ]
})
export class CardProcessingModule { }
