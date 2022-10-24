import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuytokensComponent } from './buytokens/buytokens.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { OpenbetsComponent } from './openbets/openbets.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/buy-tokens', component: BuytokensComponent},
  { path: 'openbets', component: OpenbetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
