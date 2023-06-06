import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VendorsModule } from './vendors/vendors.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VendorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
