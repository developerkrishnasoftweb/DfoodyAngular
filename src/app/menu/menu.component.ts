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
  selectedCategoryId: string = null;

  menuItemList = [];
  comboMealList = [];

  condimentSets = [];

  tabType = TabType;

  selectedItem: any = null;

  displayModal = new DisplayModalClass();


  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  categoryClick(category): void {
    if (this.selectedCategoryId == category.id)
      return
    this.selectedCategoryId = category.id;
    this.getMenuItem();
    this.getCombomeal();
  }

  menuItemClick(item, type): void {
    debugger
    switch (type) {
      case this.tabType.menu:
        this.selectedItem = item;
        this.displayModal.ListItemKey = "display_name";
        this.displayModal.ListKey = "condimentSets";
        this.displayModal.ModalTitle = "Condiment Sets";
        this.displayModal.SubListKey = "condiments";
        this.displayModal.SubListItemKey = "displayName";
        break;
      case this.tabType.combomeal:
        this.selectedItem = item;
        this.displayModal.ListItemKey = "displayName";
        this.displayModal.ListKey = "sidesets";
        this.displayModal.ModalTitle = "Side Sets";
        this.displayModal.SubListKey = "sides";
        this.displayModal.SubListItemKey = "displayName";
        break;

      default:
        break;
    }
    this.condimentSets = item.condimentSets;
  }

  getMenuCategories(branchId): void {
    this.categoriesList = [];
    this.menuService.GetCategories({ 'branchId': branchId })
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.categoriesList = response.items;
        if (this.categoriesList && this.categoriesList.length > 0) {
          this.categoryClick(this.categoriesList[0]);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getMenuItem(): void {
    this.menuItemList = [];
    this.menuService.GetMenuItem({ 'branchCategoryId': this.selectedCategoryId })
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.menuItemList = response.items;
        console.log('menu ', response);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getCombomeal(): void {
    this.comboMealList = [];
    this.menuService.GetCombomeal({ 'branchCategoryId': this.selectedCategoryId })
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.comboMealList = response.items;
        console.log('comboMealList ', response);

      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }
}

export class DisplayModalClass {
  ModalTitle: string;
  ListKey: string;
  ListItemKey: string;
  SubListKey: string;
  SubListItemKey: string;
}

export enum TabType {
  menu = "menu",
  combomeal = "combomeal"
}