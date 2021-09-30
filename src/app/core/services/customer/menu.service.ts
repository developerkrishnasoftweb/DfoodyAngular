import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _apiService: ApiService) { }

  getBrands(model) {
    console.log(model);
    return this._apiService.GetBrands.getAll(model).map(response => response)
  }

  GetBranches(obj) {
    return this._apiService.GetBranches.getAll(obj).map(response => response)
  }

  GetCategories(obj) {
    return this._apiService.GetCategories.getAll(obj).map(response => response)
  }
}
