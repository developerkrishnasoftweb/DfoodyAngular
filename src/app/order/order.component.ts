import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '@core/models/customer';
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

  paginationModel = new Pagination();


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.setPaginationData();
    this.getOrderList();
  }

  onclickOrderDetail(order) {
    this.orderDetail.getOrderDetail(order.id);
  }

  getOrderList(): void {
    this.orderList = [];
    this.isAPIResponseCome = false;
    this.orderService.getOrderList(this.paginationModel)
      .pipe(finalize(() => {
        this.isAPIResponseCome = true;
      })).subscribe((response) => {
        if (response && response.items && response.items.length > 0) {
          this.orderList = response.items;
          this.paginationModel.totalPages = response.totalPages;
          this.paginationModel.totalRecords = response.totalRecords;
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
          this.paginationModel = new Pagination();
        }
      });
  }

  setPaginationData() {
    this.paginationModel.pageNumber = 1;
    this.paginationModel.pageSize = 5;
  }

  pagePrevious(): void {
     if (this.paginationModel.pageNumber == 0)
      return
    this.paginationModel.pageNumber -= 1;
    this.getOrderList();
  }

  pageNext(): void {
    if (this.paginationModel.pageNumber === this.paginationModel.totalPages)
      return;
    this.paginationModel.pageNumber += 1;
    this.getOrderList();
  }

  ngOnDestroy(): void {
    this.orderList = new Array<any>();
    this.paginationModel = new Pagination();
  }

}
