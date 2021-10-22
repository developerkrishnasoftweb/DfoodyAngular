import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '@core/services/customer/order.service';
import { finalize } from 'rxjs/operators';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderList = [];
  isAPIResponseCome: boolean = false;

  selectedId = null;

  @ViewChild('orderDetail') private orderDetail: OrderDetailComponent;


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  onclickOrderDetail(order) {
    this.orderDetail.getOrderDetail(order.id);
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
