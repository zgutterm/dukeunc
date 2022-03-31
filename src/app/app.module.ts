import { BrowserModule } from '@angular/platform-browser';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgModule } from '@angular/core';
import { NgParticlesModule } from "ng-particles";


import { AppComponent } from './app.component';
import { OddsComponent } from './odds/odds.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OddsComponent
  ],
  imports: [
    BrowserModule,
    NgxGaugeModule,
    HttpClientModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
