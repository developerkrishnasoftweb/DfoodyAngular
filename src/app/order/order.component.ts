import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '@core/services/customer/order.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(): void {
    this.orderList = [];
    this.orderService.getOrderList()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        if (response && response.items && response.items.length > 0)
          this.orderList = response.items;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

}
