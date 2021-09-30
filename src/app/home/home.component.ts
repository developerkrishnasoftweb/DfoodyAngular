import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Brand, Pagination } from '@core/models/customer';
import { MenuService } from '@core/services/customer/menu.service';
import { finalize } from 'rxjs/operators';
import { BranchDetailComponent } from '../branch-detail/branch-detail.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  brandList = new Array<Brand>();
  paginationModel = new Pagination();

  displayBranch: boolean = false;

  selectedItemId: string = "";

  private branchDetail: BranchDetailComponent;

  @ViewChild('branchDetail', { static: false }) set content(content: BranchDetailComponent) {
    if (content) {
      this.branchDetail = content;
      if (this.selectedItemId) {
        this.branchDetail.displayBranch(this.selectedItemId);
      }
    }
  }



  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.setPaginationData();
    this.getBrands();
  }

  getBrands(): void {
    this.menuService.getBrands(this.paginationModel)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.brandList = response.items;
        this.paginationModel.totalPages = response.totalPages;
        this.paginationModel.totalRecords = response.totalRecords;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  itemClick(itemId) {
    this.displayBranch = true;
    this.selectedItemId = itemId;
  }

  setPaginationData() {
    this.paginationModel.pageNumber = 1;
    this.paginationModel.pageSize = 3;
  }

  pagePrevious(): void {
    if (this.paginationModel.pageNumber == 0)
      return
    this.paginationModel.pageNumber -= 1;
    this.getBrands();
  }

  pageNext(): void {
    if (this.paginationModel.pageNumber === this.paginationModel.totalPages)
      return;
    this.paginationModel.pageNumber += 1;
    this.getBrands();
  }

}
