import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _apiService: ApiService) { }

  getBrands() {
    return this._apiService.GetBrands.getAll().map(response => response)
  }

  GetBranches(obj) {
    return this._apiService.GetBranches.getAll(obj).map(response => response)
  }
}
