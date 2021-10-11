import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '@core/services/customer/order.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderDetail: any = null;
  isAPIResponseCome: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail(): void {
    this.orderDetail = null;
    this.isAPIResponseCome = false;
    this.orderService.getOrderDetail(22)
      .pipe(finalize(() => {
        this.isAPIResponseCome = true;
      })).subscribe((response) => {
        console.log('response');
        if (response && response.items && response.items.length > 0)
          this.orderDetail = response.items;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }
}
