import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand, Pagination } from '@core/models/customer';
import { MenuService } from '@core/services/customer/menu.service';
import { UserLoginService } from '@core/services/user-login.service';
import { LoaderService } from '@shared/loader/loader.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-foodmenu',
  templateUrl: './foodmenu.component.html',
  styleUrls: ['./foodmenu.component.scss']
})
export class FoodmenuComponent implements OnInit {

  brandList = new Array<Brand>();
  paginationModel = new Pagination();

  selectedItem: any;



  constructor(private menuService: MenuService, public userLoginService: UserLoginService,
      private loaderService: LoaderService, private router: Router
  ) { }

  ngOnInit(): void {
    if (this.userLoginService.isLoggedIn()) {
      this.setPaginationData();
      this.getBrands();
    }
  }

  getBrands(): void {
    this.loaderService.show();
    this.menuService.getBrands(this.paginationModel)
      .pipe(finalize(() => {
        this.loaderService.hide();
      })).subscribe((response: any) => {
        if (response) {
          this.brandList = response.items;
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

  itemClick(item) {
    this.selectedItem = item;
    localStorage.setItem('brandDetail', JSON.stringify(this.selectedItem));
    const url = "branch"
    this.router.navigate([url])
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

  ngOnDestroy(): void {
    this.brandList = new Array<Brand>();
    this.paginationModel = new Pagination();
    this.selectedItem = null;
  }
}
