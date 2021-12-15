import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeAllRoutingModule } from './home-all-routing.module';
import { HomeAllComponent } from './home-all.component';

@NgModule({
  declarations: [HomeAllComponent],
  imports: [CommonModule, HomeAllRoutingModule],
  exports: [HomeAllComponent],
})
export class HomeAllModule {}