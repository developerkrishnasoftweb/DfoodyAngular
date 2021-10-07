import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _apiService: ApiService) { }

  getBrands(model) {
    return this._apiService.GetBrands.getAll(model).map(response => response);
  }

  GetBranches(obj) {
    return this._apiService.GetBranches.getAll(obj).map(response => response);
  }

  GetCategories(obj) {
    return this._apiService.GetCategories.getAll(obj).map(response => response);
  }

  GetCombomeal(obj) {
    return this._apiService.GetCombomeal.getAll(obj).map(response => response);
  }

  GetMenuItem(obj) {
    return this._apiService.GetMenuItem.getAll(obj).map(response => response);
  }

  AddToCardMenuItem(obj) {
    return this._apiService.AddItemToCart.create(obj).map(response => response);
  }

  AddCombomealToCart(obj) {
    return this._apiService.AddCombomealToCart.create(obj).map(response => response);
  }

  GetCartItem() {
    return this._apiService.GetCartList.getAll().map(response => response);
  }

  deleteCartItem(addressId: string): Observable<any> {
    return this._apiService.DeleteCartItem.remove(addressId).map(response => response)
  }

  AddOrder(obj) {
    return this._apiService.AddOrder.create(obj).map(response => response);
  }
}
