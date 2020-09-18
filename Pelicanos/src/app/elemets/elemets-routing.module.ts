import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationsComponent } from './donations/donations.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  {
    path: 'elements/history',
    component: HistoryComponent
  }, 

  {
    path:'elements/donations',
    component: DonationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElemetsRoutingModule { }
