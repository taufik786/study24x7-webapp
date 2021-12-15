import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from '../auth/auth.module';
import { ErrorMsgComponent } from './error-msg/error-msg.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AuthModule
  ],
  exports : [
    HeaderComponent,
    ErrorMsgComponent
  ]
})
export class SharedModule { }
