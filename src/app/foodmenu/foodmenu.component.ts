import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Brand, Pagination } from '@core/models/customer';
import { MenuService } from '@core/services/customer/menu.service';
import { UserLoginService } from '@core/services/user-login.service';
import { finalize } from 'rxjs/operators';
import { BranchDetailComponent } from '../branch-detail/branch-detail.component';
@Component({
  selector: 'app-foodmenu',
  templateUrl: './foodmenu.component.html',
  styleUrls: ['./foodmenu.component.scss']
})
export class FoodmenuComponent implements OnInit {

  brandList = new Array<Brand>();
  paginationModel = new Pagination();

  displayBranch: boolean = false;

  selectedItem: any;

  private branchDetail: BranchDetailComponent;

  @ViewChild('branchDetail', { static: false }) set content(content: BranchDetailComponent) {
    if (content) {
      this.branchDetail = content;
      if (this.selectedItem) {
        this.branchDetail.displayBranch(this.selectedItem);
      }
    }
  }



  constructor(private menuService: MenuService, public userLoginService: UserLoginService,
  ) { }

  ngOnInit(): void {
    if (this.userLoginService.isLoggedIn()) {
      this.setPaginationData();
      this.getBrands();
    }
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

  itemClick(item) {
    this.displayBranch = true;
    this.selectedItem = item;
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
