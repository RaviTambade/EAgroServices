import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpaModule } from './spa/spa.module';
import { VendorsModule } from './vendors/vendors.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { DefaultModule } from './default/default.module';
import { ListfilterModule } from './listfilter/listfilter.module';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VendorsModule,
    SpaModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
  DefaultModule,
  ListfilterModule,
  PaymentGatewayModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
