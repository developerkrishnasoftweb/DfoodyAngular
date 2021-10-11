import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '@core/models/customer';
import { MenuService } from '@core/services/customer/menu.service';
import { LoaderService } from '@shared/loader/loader.service';
import { finalize } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.scss']
})
export class BranchDetailComponent implements OnInit {

  branchList = [];

  paginationModel = new Pagination();


  isShowMenu: boolean = false;


  isAPIResponseCome: boolean = false;

  branchDetail: any = null;

  private menu: MenuComponent;

  @ViewChild('menu', { static: false }) set content(content: MenuComponent) {
    if (content) {
      this.menu = content;
      if (this.branchDetail) {
        this.menu.getMenuCategories(this.branchDetail);
      }
    }
  }

  constructor(private menuService: MenuService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.setPaginationData();
  }

  displayBranch(item): void {
    this.branchDetail = item;
    this.isAPIResponseCome = false;
    this.loaderService.show();
    this.menuService.GetBranches({ 'brandId': item.id })
      .pipe(finalize(() => {
        this.loaderService.hide();
        // tslint:disable-next-line: deprecation
        this.isAPIResponseCome = true;
      })).subscribe((response: any) => {
        if (response) {
          this.branchList = response.items;
          this.paginationModel.totalPages = response.totalPages;
          this.paginationModel.totalRecords = response.totalRecords;
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  showMenu(item) {
    this.branchDetail = item;
    this.isShowMenu = true;
  }

  setPaginationData() {
    this.paginationModel.pageNumber = 1;
    this.paginationModel.pageSize = 3;
  }

  ngOnDestroy() {
    this.branchDetail = null;
    this.branchList = null;
  }
}
