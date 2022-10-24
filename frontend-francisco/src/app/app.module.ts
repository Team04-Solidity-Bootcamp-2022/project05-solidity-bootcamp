import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { CreateNewLotteryComponent } from './create-new-lottery/create-new-lottery.component';
import { BetComponent } from './bet/bet.component';
import { RollComponent } from './roll/roll.component';
import { BuyTokensComponent } from './buy-tokens/buy-tokens.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    CreateNewLotteryComponent,
    BetComponent,
    RollComponent,
    BuyTokensComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
