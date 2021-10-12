import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from '@core/models/customer';
import { MenuService } from '@core/services/customer/menu.service';
import { ConstantMessage } from '@core/utils/enum';
import { LoaderService } from '@shared/loader/loader.service';
import { finalize } from 'rxjs/operators';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  branchList = [];

  paginationModel = new Pagination();

  isAPIResponseCome: boolean = false;

  brandDetail: any = null;

  errorMsg = ConstantMessage.BranchNotFound;


  constructor(private menuService: MenuService, private loaderService: LoaderService,
    private router: Router) { }

  ngOnInit(): void {
    this.setPaginationData();
    const item = localStorage.getItem('brandDetail');
    if (item) {
      this.brandDetail = JSON.parse(item);
      this.displayBranch();
    } else {
      this.router.navigateByUrl('/brands');
    }
  }

  displayBranch(): void {
    this.isAPIResponseCome = false;
    this.loaderService.show();
    this.menuService.GetBranches({ 'brandId': this.brandDetail.id })
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
    localStorage.setItem('branchDetail', JSON.stringify(item));
    this.router.navigate(['menu']);
  }

  setPaginationData() {
    this.paginationModel.pageNumber = 1;
    this.paginationModel.pageSize = 3;
  }

  ngOnDestroy() {
    this.branchList = null;
  }

}
