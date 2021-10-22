import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  }

  getOrderDetail(id): void {
    this.orderDetail = null;
    this.isAPIResponseCome = false;
    this.orderService.getOrderDetail(id)
      .pipe(finalize(() => {
        this.isAPIResponseCome = true;
      })).subscribe((response) => {
        this.orderDetail = response;
        if (this.orderDetail)
          this.orderDetail.fullAddress = this.getFullAddress(response);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getFullAddress(address): string {
    let fullAddress = "";
    if (address)
      fullAddress = address.address1 + ", " + address.address2 + ", " + address.area + ", " + address.city + ", " + address.state + ", " + address.country;

    return fullAddress;
  }
}
