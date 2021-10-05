import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
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

  selectedBranchId: string = "";

  isShowMenu: boolean = false;

  brandDetail: any;

  isAPIResponseCome: boolean = false;

  private menu: MenuComponent;

  @ViewChild('menu', { static: false }) set content(content: MenuComponent) {
    if (content) {
      this.menu = content;
      if (this.selectedBranchId) {
        this.menu.getMenuCategories(this.selectedBranchId);
      }
    }
  }


  constructor(private menuService: MenuService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.setPaginationData();
  }



  displayBranch(item): void {
    this.brandDetail = item;
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

  showMenu(id) {
    this.isShowMenu = true;
    this.selectedBranchId = id;
  }


  setPaginationData() {
    this.paginationModel.pageNumber = 1;
    this.paginationModel.pageSize = 3;
  }

  ngOnDestroy() {
    this.brandDetail = null;
    this.selectedBranchId = null;
    this.branchList = null;
  }

}
