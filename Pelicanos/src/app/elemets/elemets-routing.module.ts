import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationsComponent } from './donations/donations.component';
import { HistoryComponent } from './history/history.component';
import { WhoAreComponent } from './who-are/who-are.component';


const routes: Routes = [
  {
    path: 'elements/history',
    component: HistoryComponent
  }, 

  {
    path:'elements/donations',
    component: DonationsComponent
  },

  {
    path:'elements/who-are',
    component: WhoAreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElemetsRoutingModule { }
