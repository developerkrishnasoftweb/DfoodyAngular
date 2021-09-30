import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '@core/services/customer/menu.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isShowMenu: boolean = false;
  categoriesList = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }


  getMenuCategories(branchId): void {
    this.menuService.GetCategories({ 'branchId': branchId })
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.categoriesList = response.items;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }
}
