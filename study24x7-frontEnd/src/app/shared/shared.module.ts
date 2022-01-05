import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports : [
    HeaderComponent,
    ErrorMsgComponent
  ]
})
export class SharedModule { }
