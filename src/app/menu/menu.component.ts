import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddOrderReqModel, AddressDisplayModel, AddToCartComoMealItemReq, AddToCartMenuItemReq, AddToCartReq, Condiment, DisplayModalClass, Sideset, TabType, UpdateQuntityModel } from '@core/models/customer';
import { AddressService } from '@core/services/customer/address.service';
import { MenuService } from '@core/services/customer/menu.service';
import { ConstantMessage } from '@core/utils/enum';
import { ConfirmDialogService } from '@shared/confirm-dialog/confirm-dialog.service';
import { LoaderService } from '@shared/loader/loader.service';
import { SnackBarService } from '@shared/snack-bar/snack-bar.service';
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

  menuItemListBackUP = null;
  comboMealListBackUP = null;

  tabType = TabType;

  selectedItem: any = null;

  displayModal = new DisplayModalClass();
  branchDetail: any;

  @ViewChild('closeButton') private closeButton: ElementRef;

  @ViewChild('closeButton1') private closeButton1: ElementRef;


  cartList = [];

  addressList = [];

  addressId = null;

  disableCart: boolean = false;

  constructor(private menuService: MenuService,
    private loaderService: LoaderService,
    private snackBarService: SnackBarService,
    private confirmDialogService: ConfirmDialogService,
    private addressService: AddressService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCartList();
    this.getAddressList();
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
      case this.tabType.menu:
        this.displayModal.ListItemKey = "display_name";
        this.displayModal.ListKey = "condimentSets";
        this.displayModal.ModalTitle = "Condiment Sets";
        this.displayModal.SubListKey = "condiments";
        this.displayModal.SubListItemKey = "displayName";
        this.displayModal.ParentId = "condimentSetId";
        this.displayModal.Min = "min";
        this.displayModal.Max = "max";
        break;
      case this.tabType.combomeal:
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

  getMenuCategories(branchDetail): void {
    this.loaderService.show();
    this.branchDetail = branchDetail;
    this.cdr.detectChanges();
    console.log(branchDetail);
    this.categoriesList = [];
    this.menuService.GetCategories({ 'branchId': branchDetail.id })
      .pipe(finalize(() => {
        this.loaderService.hide();
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
        if (this.menuItemList && this.menuItemList.length > 0) {
          this.menuItemList = this.menuItemList.map(data => ({
            ...data, type: TabType.menu, condimentSets: data.condimentSets.map(data1 => ({
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
    this.menuService.GetCombomeal({ 'branchCategoryId': this.selectedCategoryId })
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        this.comboMealList = response.items;
        if (this.comboMealList && this.comboMealList.length > 0) {
          this.comboMealList = this.comboMealList.map(data => ({
            ...data, type: TabType.combomeal, sidesets: data.sidesets.map(data1 => ({
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
    console.log('cart ', cart);
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
    switch (this.selectedItem.type) {
      case TabType.menu:
        let index = this.menuItemList.findIndex(x => x.id == this.selectedItem.id);
        this.menuItemList[index] = this.selectedItem;
        this.addMenuItemToCart(this.selectedItem);
        break;
      case TabType.combomeal:
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
      case TabType.menu:
        item.IsDisabled = count >= item[this.displayModal.Max] && count <= item[this.displayModal.Min] ? true : false;
        item.IsValid = count && count <= item[this.displayModal.Max] && count >= item[this.displayModal.Min] ? true : false;
        break;
      case TabType.combomeal:
        item.IsDisabled = count <= item[this.displayModal.Min] ? true : false;
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

  //address 
  getAddressList(): void {
    this.addressService.getAddressList()
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response) => {
        console.log('address ', response);
        if (response && response.items && response.items.length > 0) {
          this.addressList = response.items;
          this.addressList = this.addressList.map(data => ({
            ...data, fullAddress: this.getFullAddress(data), IsChecked: false
          }))
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  getFullAddress(address: AddressDisplayModel): string {
    let fullAddress = "";
    if (address) {
      fullAddress = address.address1 + ", " + address.address2 + ", " + address.area + ", " + address.city + ", " + address.state + ", " + address.country;
    }
    return fullAddress;
  }

  onConfirmCartItem() {
    document.getElementById("openModalButton").click();
  }

  onSaveAddress(): void {
    this.addOrder();
  }

  AddressSelected(id) {
    this.addressId = id;
  }

  addOrder(): void {
    const model = this.createOrderModel();
    this.menuService.AddOrder(model)
      .pipe(finalize(() => {
        // tslint:disable-next-line: deprecation
      })).subscribe((response: any) => {
        if (response) {
          this.snackBarService.show(ConstantMessage.ItemSaved);
          this.getCartList();
          this.closeButton1.nativeElement.click();
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      });
  }

  createOrderModel(): AddOrderReqModel {
    const model = new AddOrderReqModel();
    model.branchId = this.branchDetail.id;
    model.address_id = this.addressId;
    model.orderdate = new Date();
    return model;
  }

  onCloseAddressPopup() {
    this.addressId = null;
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


  closeAddressModel(): void {
    this.closeButton1.nativeElement.click();
  }
}

