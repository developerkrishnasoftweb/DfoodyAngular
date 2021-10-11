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
  isAPIResponseCome: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(): void {
    this.orderList = [];
    this.isAPIResponseCome = false;
    this.orderService.getOrderList()
      .pipe(finalize(() => {
        this.isAPIResponseCome = true;
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
