import { Component, Input, OnInit } from '@angular/core';
import { ConstantMessage } from '@core/utils/enum';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input('errorMsg') errorMsg : string = ConstantMessage.PageNotFound;

  constructor() { }

  ngOnInit(): void {
  }

}
