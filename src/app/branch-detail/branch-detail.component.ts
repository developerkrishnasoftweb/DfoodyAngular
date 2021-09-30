import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Pagination } from '@core/models/customer';
import { MenuService } from '@core/services/customer/menu.service';
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

  selectedBranchId: string = "";

  isShowMenu: boolean = false;

  private menu: MenuComponent;

  @ViewChild('menu', { static: false }) set content(content: MenuComponent) {
    if (content) {
      this.menu = content;
      if (this.selectedBranchId) {
        this.menu.getMenuCategories(this.selectedBranchId);
      }
    }
  }


  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.setPaginationData();
  }



  displayBranch(itemId): void {
    this.menuService.GetBranches({ 'brandId': itemId })
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.branchList = response.items;
        this.paginationModel.totalPages = response.totalPages;
        this.paginationModel.totalRecords = response.totalRecords;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  showMenu(id) {
    this.isShowMenu = true;
    this.selectedBranchId = id;
  }


  setPaginationData() {
    this.paginationModel.pageNumber = 1;
    this.paginationModel.pageSize = 3;
  }

}