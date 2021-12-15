import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {

  @Input() error:any;
  @Output() close = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onCloseClick() {
    this.close.emit();
  }

}
