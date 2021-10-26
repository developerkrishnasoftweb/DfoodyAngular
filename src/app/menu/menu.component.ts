import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddToCartComoMealItemReq, AddToCartMenuItemReq, AddToCartReq, Condiment, DisplayModalClass, MenuTabType, Sideset, TabType, UpdateQuntityModel } from '@core/models/customer';
import { MenuService } from '@core/services/customer/menu.service';
import { ConstantMessage, ValidationMsg } from '@core/utils/enum';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { LoaderService } from '@shared/loader/loader.service';
import { SnackBarService } from '@shared/snack-bar/snack-bar.service';
import { finalize } from 'rxjs/operators';
import { ConfirmOrderAddressModalComponent } from '../confirm-order-address-modal/confirm-order-address-modal.component';

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
  isMenuResponseCome: boolean = false;

  comboMealList = [];
  isComboMealResponseCome: boolean = false;

  menuItemListBackUP = null;
  comboMealListBackUP = null;

  menuTabType = MenuTabType;
  tabType = TabType;
  selectedTabType: string = null;

  selectedItem: any = null;

  displayModal = new DisplayModalClass();
  branchDetail: any;

  @ViewChild('closeButton') private closeButton: ElementRef;

  cartList = [];

  disableCart: boolean = false;

  isAPIResponseCome: boolean = false;

  //for coupon
  couponForm: FormGroup;
  couponList = [];
  apiErrorMsg: string = "";
  validationMsgEnum = ValidationMsg;
  couponCodeValue = localStorage.getItem('couponCode');


  constructor(private menuService: MenuService,
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: SnackBarService,
    private confirmDialogService: ConfirmDialogService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const item = localStorage.getItem('branchDetail');
    this.createCouponForm();
    if (item) {
      this.branchDetail = JSON.parse(item);
      this.getMenuCategories();
      this.getCartList();
      this.getCouponList();
      if (this.branchDetail.deliveryOpen)
        this.selectedTabType = TabType.delivery;
      if (!this.branchDetail.deliveryOpen && this.branchDetail.pickupOpen)
        this.selectedTabType = TabType.pickup;
    } else {
      this.router.navigateByUrl('/branch');
    }
  }

  changeTab(tab) {
    this.selectedTabType = tab;
  }

  categoryClick(category): void {
    if (this.selectedCategoryId == category.id)
      return
    this.selectedCategoryId = category.id;
    this.getMenuItem();
    this.getCombomeal();
  }

  menuItemClick(item, type): void {
    this.selectedItem = item;
    switch (type) {
      case MenuTabType.menu:
        this.displayModal.ListItemKey = "display_name";
        this.displayModal.ListKey = "condimentSets";
        this.displayModal.ModalTitle = "Condiment Sets";
        this.displayModal.SubListKey = "condiments";
        this.displayModal.SubListItemKey = "displayName";
        this.displayModal.ParentId = "condimentSetId";
        this.displayModal.Min = "min";
        this.displayModal.Max = "max";
        break;
      case MenuTabType.combomeal:
        this.displayModal.ListItemKey = "displayName";
        this.displayModal.ListKey = "sidesets";
        this.displayModal.ModalTitle = "Side Sets";
        this.displayModal.SubListKey = "sides";
        this.displayModal.SubListItemKey = "displayName";
        this.displayModal.ParentId = "sidesetId";
        this.displayModal.Min = "minSideCount";
        break;
      default:
        break;
    }
  }

  getMenuCategories(): void {
    this.loaderService.show();
    this.cdr.detectChanges();
    this.categoriesList = [];
    this.isAPIResponseCome = false;
    this.menuService.GetCategories({ 'branchId': this.branchDetail.id })
      .pipe(finalize(() => {
        this.loaderService.hide();
        this.isAPIResponseCome = true;
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
    this.isMenuResponseCome = false;
    this.menuService.GetMenuItem({ 'branchCategoryId': this.selectedCategoryId })
      .pipe(finalize(() => {
        this.isMenuResponseCome = true;
      })).subscribe((response: any) => {
        this.menuItemList = response.items;
        if (this.menuItemList && this.menuItemList.length > 0) {
          this.menuItemList = this.menuItemList.map(data => ({
            ...data, type: MenuTabType.menu, condimentSets: data.condimentSets.map(data1 => ({
              ...data1,
              IsChecked: false,
              IsDisabled: true,
              IsValid: false,
              condiments: data1.condiments && data1.condiments.length > 0 ? data1.condiments.map(data2 => ({ ...data2, IsChecked: false, IsDisabled: false })) : null
            }))
          }));
          this.menuItemListBackUP = JSON.stringify(this.menuItemList);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getCombomeal(): void {
    this.comboMealList = [];
    this.isComboMealResponseCome = false;
    this.menuService.GetCombomeal({ 'branchCategoryId': this.selectedCategoryId })
      .pipe(finalize(() => {
        this.isComboMealResponseCome = true;
      })).subscribe((response: any) => {
        this.comboMealList = response.items;
        if (this.comboMealList && this.comboMealList.length > 0) {
          this.comboMealList = this.comboMealList.map(data => ({
            ...data, type: MenuTabType.combomeal, sidesets: data.sidesets.map(data1 => ({
              ...data1,
              IsChecked: false,
              IsDisabled: true,
              IsValid: false,
              sides: data1.sides && data1.sides.length > 0 ? data1.sides.map(data2 => ({ ...data2, IsChecked: false })) : null
            }))
          }));
          this.comboMealListBackUP = JSON.stringify(this.comboMealList);
        }

      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  updateCartQuantity(cart, isAdd) {
    if (isAdd) {
      cart.quantity += 1;
    } else {
      if (cart.quantity > 1)
        cart.quantity -= 1;
      else
        return;
    }
    this.updateQuntity(cart);
  }

  onSave(): void {
    this.closeButton.nativeElement.click();
    this.checkSameBranchEntry();
  }

  checkSameBranchEntry(): void {
    this.loaderService.show();
    this.menuService.CheckSameBranchEntry(this.branchDetail.id)
      .pipe(finalize(() => {
        this.loaderService.hide();
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response)
          this.callAPI();
        else
          this.branchEntryConfirmDialog();
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }


  branchEntryConfirmDialog() {
    this.confirmDialogService.confirmThis(ConstantMessage.BranchEntry, () => {
      //yes click
      this.callAPI();
    }, () => {
      //No click
    });
  }

  addToCartWithoutToppings(item): void {
    this.selectedItem = item;
    this.checkSameBranchEntry();
  }

  callAPI() {
    switch (this.selectedItem.type) {
      case MenuTabType.menu:
        let index = this.menuItemList.findIndex(x => x.id == this.selectedItem.id);
        this.menuItemList[index] = this.selectedItem;
        this.addMenuItemToCart(this.selectedItem);
        break;
      case MenuTabType.combomeal:
        let combomealindex = this.comboMealList.findIndex(x => x.id == this.selectedItem.id);
        this.comboMealList[combomealindex] = this.selectedItem;
        this.addComboMealToCart(this.selectedItem);
        break;
      default:
        break;
    }
  }

  resetCartItem(): void {
    this.menuItemList = JSON.parse(this.menuItemListBackUP);
    this.comboMealList = JSON.parse(this.comboMealListBackUP);
  }


  addMenuItemToCart(item): void {
    const model = this.createMenuItemModel(item);
    this.menuService.AddToCardMenuItem(model)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response) {
          this.snackBarService.show(ConstantMessage.ItemSaved);
          this.getCartList();
          this.resetCartItem();
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  addComboMealToCart(item): void {
    const model = this.createComboMealModel(item);
    this.menuService.AddCombomealToCart(model)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response) {
          this.snackBarService.show(ConstantMessage.ItemSaved);
          this.getCartList();
          this.resetCartItem();
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  createAddToCartModel(item): AddToCartReq {
    const model = new AddToCartReq();
    model.itemId = item.id;
    model.branchId = this.branchDetail.id;
    model.quantity = 1;
    model.amount = item.price;
    model.prepTime = item.prep_time;
    return model;
  }

  createMenuItemModel(item): AddToCartMenuItemReq {
    let model = new AddToCartMenuItemReq();
    model = Object.assign(this.createAddToCartModel(item));
    let condimentList = new Array<Condiment>();
    if (item.condimentSets && item.condimentSets.length > 0) {
      item.condimentSets.forEach(element => {
        if (element.condiments && element.condiments.length > 0) {
          const list = element.condiments.filter(x => x.IsChecked);
          if (list && list.length > 0) {
            list.forEach(condiment => {
              let condimentModel = new Condiment();
              condimentModel.condimentId = condiment.id;
              condimentModel.condimentSetId = condiment.condimentSetId;
              condimentModel.prepTime = condiment.prepTime;
              condimentModel.amount = condiment.price;
              condimentList.push(condimentModel);
            });
          }
        }
      });
    }
    model.condimentList = condimentList;
    return model;
  }

  createComboMealModel(item): AddToCartComoMealItemReq {
    let model = new AddToCartComoMealItemReq();
    model = Object.assign(this.createAddToCartModel(item));
    let sidesetList = new Array<Sideset>();
    if (item.sidesets && item.sidesets.length > 0) {
      item.sidesets.forEach(element => {
        if (element.sides && element.sides.length > 0) {
          const list = element.sides.filter(x => x.IsChecked);
          if (list && list.length > 0) {
            list.forEach(side => {
              let sideSetModel = new Sideset();
              sideSetModel.sideId = side.id;
              sideSetModel.sidesetId = side.sidesetId;
              sideSetModel.prepTime = side.prepTime;
              sideSetModel.amount = side.price;
              sidesetList.push(sideSetModel);
            });
          }
        }
      });
    }
    model.sidesetList = sidesetList;
    return model;
  }

  onCheckboxChange(selectedSubItem, parent) {
    if (this.selectedItem && this.selectedItem[this.displayModal.ListKey] && this.selectedItem[this.displayModal.ListKey].length > 0) {
      let findKey = this.selectedItem[this.displayModal.ListKey].find(x => x.id === selectedSubItem[this.displayModal.ParentId]);
      if (findKey)
        findKey.IsChecked = this.isChildChecked(parent);
    }
    this.checkValidation(parent);
  }

  getCount(parent): number {
    if (parent && parent[this.displayModal.SubListKey].length > 0)
      return parent[this.displayModal.SubListKey].filter(x => x.IsChecked).length;
    else
      return 0;
  }

  isChildChecked(parent): boolean {
    if (parent && parent[this.displayModal.SubListKey].length > 0)
      return parent[this.displayModal.SubListKey].some(x => x.IsChecked);
    return false;
  }

  onCheckboxItemChange(item) {
    if (item[this.displayModal.SubListKey] && item[this.displayModal.SubListKey].length > 0) {
      if (item.IsChecked)
        item[this.displayModal.SubListKey][0].IsChecked = item.IsChecked;
      else
        item[this.displayModal.SubListKey] = item[this.displayModal.SubListKey].map(x => ({ ...x, IsChecked: false }));
      this.checkValidation(item);
    }
  }

  checkValidation(item) {
    let count = this.getCount(item);
    switch (this.selectedItem.type) {
      case MenuTabType.menu:
        item.IsDisabled = count >= item[this.displayModal.Max] || count < item[this.displayModal.Min] ? true : false;
        item.IsValid = count && count <= item[this.displayModal.Max] || count > item[this.displayModal.Min] ? true : false;
        break;
      case MenuTabType.combomeal:
        item.IsDisabled = count < item[this.displayModal.Min] ? true : false;
        item.IsValid = count && count >= item[this.displayModal.Min] ? true : false;
        break;
      default:
        break;
    }
  }

  isAddToCartDisabled() {
    if (this.selectedItem[this.displayModal.ListKey] && this.selectedItem[this.displayModal.ListKey].length > 0) {
      let result = this.selectedItem[this.displayModal.ListKey].every(function (e) {
        return e.IsValid === true;
      });
      return !result;
    } else
      return false;
  }

  deleteConfirmDialog(id) {
    this.confirmDialogService.confirmThis(ConstantMessage.DeleteConfirm, () => {
      //yes click
      this.deleteCart(id)
    }, () => {
      //No click
    });
  }

  deleteCart(id) {
    this.menuService.deleteCartItem(id)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        if (response) {
          this.getCartList();
          this.snackBarService.show(ConstantMessage.CartItemDeleted);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getCartList(): void {
    this.menuService.GetCartItem()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.cartList = response.items;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }



  onConfirmCartItem() {
    document.getElementById("openModalButton").click();
  }


  updateQuntity(cart): void {
    this.disableCart = true;
    const model = this.getUpdateQuntityModel(cart);
    this.menuService.UpdateQuantity(model)
      .pipe(finalize(() => {
        this.disableCart = false;
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response) {
          this.getCartList();
        } else {
          this.snackBarService.show(ConstantMessage.UnableToUpdateQuntity);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getUpdateQuntityModel(cart: any): UpdateQuntityModel {
    const model = new UpdateQuntityModel();
    model.cartId = cart.cartId;
    model.quantity = cart.quantity;
    return model;
  }


  createCouponForm(): void {
    this.couponForm = this.formBuilder.group({
      couponCode: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]
    });
  }

  get formControl() { return this.couponForm.controls; }


  //coupon
  applyCoupon() {
    this.couponForm.markAllAsTouched();
    this.couponForm.markAsDirty();
    if (this.couponForm.invalid)
      return;
    this.menuService.ApplyCouponCode(this.couponForm.value.couponCode)
      .pipe(finalize(() => {
      })).subscribe((response: any) => {
        if (response.success) {
          localStorage.setItem('couponCode', this.couponForm.value.couponCode);
          this.resetCouponForm();
        }
        this.snackBarService.show(response.message);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  resetCouponForm() {
    this.getCouponList();
    this.couponForm.markAsUntouched();
    this.couponForm.markAsPristine();
  }

  disabledApplyCodeBtn() {
    return localStorage.getItem('couponCode') ? true : false;
  }


  forceUppercaseConditionally(event) {
    this.couponForm.get('couponCode').setValue(event.target.value.toUpperCase());
  }

  getCouponList() {
    this.couponList = [];
    this.menuService.GetCouponList()
      .pipe(finalize(() => {
      })).subscribe((response: any) => {
        console.log('coupon ', response);
        this.couponList = response.items;
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  disableCoupon() {
    return localStorage.getItem('couponCode') ? true : false;
  }
}

