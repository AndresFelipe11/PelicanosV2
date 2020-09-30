import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElemetsRoutingModule } from './elemets-routing.module';
import { HistoryComponent } from './history/history.component';
import { DonationsComponent } from './donations/donations.component';
import { WhoAreComponent } from './who-are/who-are.component';



@NgModule({
  declarations: [HistoryComponent, DonationsComponent, WhoAreComponent],
  imports: [
    CommonModule,
    ElemetsRoutingModule
  ]
})
export class ElemetsModule { }
