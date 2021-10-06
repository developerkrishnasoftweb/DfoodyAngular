import { Injectable } from '@angular/core';
import { AddressReqModel } from '@core/models/customer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _apiService: ApiService) { }

  getAddressList(): Observable<any> {
    return this._apiService.GetCustomerAddress.getAll(null, null).pipe(map(response => response));
  }

  addAddress(AddReqModel: AddressReqModel): Observable<any> {
    return this._apiService.AddCustomerAddress.create(AddReqModel, null, null).map(response => response)
  }

  updateCustomerAddress(UpdateReqModel: AddressReqModel): Observable<any> {
    return this._apiService.UpdateCustomerAddress.create(UpdateReqModel, null, null).map(response => response)
  }

  deleteAddress(addressId: string): Observable<any> {
    return this._apiService.DeleteCustomerAddress(addressId).create(null, null, null).map(response => response)
  }
}
