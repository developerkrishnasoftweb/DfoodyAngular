import { Injectable } from '@angular/core';
import { AddressModel } from '@core/models/customer';
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

  addAddress(AddReqModel: AddressModel): Observable<any> {
    return this._apiService.AddCustomerAddress.create(AddReqModel, null, null).map(response => response)
  }

  updateAddress(UpdateReqModel: AddressModel, addressId: string): Observable<any> {
    return this._apiService.UpdateCustomerAddress.updateById(addressId, UpdateReqModel, null).map(response => response)
  }

  deleteAddress(addressId: string): Observable<any> {
    return this._apiService.DeleteCustomerAddress(addressId).remove(null, null).map(response => response)
  }
}
