import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ErrorMsgComponent } from './error-msg/error-msg.component';


@NgModule({
  declarations: [
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports : [
    ErrorMsgComponent
  ]
})
export class SharedModule { }
