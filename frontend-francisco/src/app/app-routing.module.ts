import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateNewLotteryComponent } from './create-new-lottery/create-new-lottery.component';
import { BetComponent } from './bet/bet.component';
import { RollComponent } from './roll/roll.component';
import { BuyTokensComponent } from './buy-tokens/buy-tokens.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  { path: 'create-new-lottery', component: CreateNewLotteryComponent },
  { path: 'bet', component: BetComponent },
  { path: 'roll', component: RollComponent },
  { path: 'buy-tokens', component: BuyTokensComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
